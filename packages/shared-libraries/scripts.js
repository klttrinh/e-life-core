/* eslint-disable @typescript-eslint/no-var-requires */

const { exec } = require('child_process');
const { pour } = require('std-pour');
const path = require('path');
// const { checkRequiredEnvs } = require('./dist/src/helpers/index');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { config: dotenvConfig } = require('dotenv');

const log = (...args) => {
  console.log(...args);
};

const info = (...args) => {
  console.log('\x1b[33m%s\x1b[0m', ...args);
};

const error = (...args) => {
  console.log('\x1b[41m%s\x1b[0m', ...args);
};

const warn = (...args) => {
  console.log('\x1b[0;33m\x1b[0m', ...args);
};

async function execute(command, follow = false) {
  log('CMD>', command);
  return new Promise((resolve, reject) => {
    if (follow) {
      pour(command, [], { timeout: 100000, shell: true }).then((code) => (code > 0 ? reject() : resolve()));
    } else {
      // eslint-disable-next-line no-shadow
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        if (stderr) {
          console.log(stderr);
          return reject(stderr);
        }
        resolve(stdout);
        return console.log(stdout);
      });
    }
  });
}

function loadCWDEnvs(override) {
  dotenvConfig({
    path: '.env',
    override,
  });
}

function loadLocalEnvs(override) {
  dotenvConfig({
    path: path.resolve(__dirname, '.env'),
    override,
  });
}

// eslint-disable-next-line no-unused-expressions
yargs(hideBin(process.argv))
  .command(
    'init',
    'will install dependencies and deploys the database migrations & seeds',
    (yargs) => {
      return yargs
        .option('containers', {
          alias: 'c',
          type: 'boolean',
          description: 'argument will also re creates all of the docker containers (etc pnpm run init -- -c)',
        })
        .option('shared', {
          alias: 'u',
          type: 'boolean',
          description: 'will also update the shared-library (etc pnpm run init -- -u)',
        });
    },
    async (args) => {
      loadCWDEnvs(false);
      try {
        await execute(`pnpm install`);
        if (args.containers) {
          /* log('Checking for required envs');
          checkRequiredEnvs(path.resolve('./.env.example')).then((res) => {
            res.forEach((key) => error(`Env not set for key: ${key}`));
            res.length > 0 && process.exit(1);
          }); */

          info('creating containers');
          const runningContainers = (await execute('docker ps -a -q')).split('\n').filter((c) => !!c);
          const runningVolumes = (await execute('docker volume ls -q')).split('\n').filter((c) => !!c);
          // eslint-disable-next-line no-restricted-syntax
          for (const container of runningContainers) {
            // eslint-disable-next-line no-await-in-loop
            await execute(`docker stop ${container}`);
            // eslint-disable-next-line no-await-in-loop
            await execute(`docker rm ${container}`);
          }
          // eslint-disable-next-line no-restricted-syntax
          for (const volume of runningVolumes) {
            // eslint-disable-next-line no-await-in-loop
            await execute(`docker volume rm ${volume}`);
          }
          await execute('docker compose up -d', true);
        }
        // await execute('rimraf dist');
        // await execute('nest build');
        await execute(
          'rimraf ./apps/payment-gateway-api/dist && rimraf ./apps/transaction-service/dist &&' +
            ' rimraf ./apps/rate-service/dist &&' +
            ' rimraf ./apps/traffic-protection-engine/dist',
          true,
        );
        await execute('pnpm build', true);
        await execute(
          'cd ./apps/payment-gateway-api && pnpm sequelize-cli db:migrate --debug ' +
            '&& pnpm sequelize-cli db:seed:all --debug',
          true,
        );
        await execute(
          'cd ./apps/transaction-service && pnpm sequelize-cli db:migrate --debug ' +
            '&& pnpm sequelize-cli db:seed:all --debug',
          true,
        );
        await execute(
          'cd ./apps/traffic-protection-engine && SET DB_CONNECTION=internal& pnpm sequelize-cli db:migrate --debug ' +
            '&& SET DB_CONNECTION=onramp& pnpm sequelize-cli db:migrate --debug ' +
            '&& SET DB_CONNECTION=internal& pnpm sequelize-cli db:seed:all --debug' +
            '&& SET DB_CONNECTION=onramp& pnpm sequelize-cli db:seed:all --debug',
          true,
        );
        await execute(
          'cd ./apps/rate-service && pnpm sequelize-cli db:migrate --debug ' +
            '&& pnpm sequelize-cli db:seed:all --debug',
          true,
        );
        info('Done');
      } catch (e) {
        error(e);
      }
    },
  )
  .command(
    'simulate',
    'Simulate AWS services',
    (yargs) => {
      return yargs
        .option('services', {
          choices: ['payment', 'transaction', 'traffic-protection', 'rate', 'all'],
          describe: 'services to run',
          alias: 's',
          default: 'all',
          array: true,
        })
        .option('branch', {
          type: 'string',
          alias: 'b',
          describe: 'branches to pull the services from',
        });
    },
    async (args) => {
      loadLocalEnvs(true);
      loadCWDEnvs(true);
      process.env.ENV_FILE_PATH = path.resolve('.env');
      if (!process.env.GIT_USERNAME || !process.env.GIT_PASSWORD) {
        throw new Error('Please make sure you have added GIT_USERNAME and GIT_PASSWORD in your local .env file');
      }
      console.log(args);
      let services = args.services.includes('all')
        ? ['payment-service', 'transaction-service', 'rate-service']
        : args.services.map((s) => `${s}-service`);

      if (services.includes('payment-service')) {
        process.env.PAYMENT_GATEWAY_URL = `http://payment-service:${process.env.PAYMENT_GATEWAY_SERVICE_PORT}`;
      }
      if (services.includes('transaction-service')) {
        process.env.TRANSACTION_SERVICE_URL = `http://transaction-service:${process.env.TRANSACTION_SERVICE_PORT}`;
      }
      if (services.includes('rate-service')) {
        process.env.RATE_SERVICE_URL = `http://rate-service:${process.env.RATE_SERVICE_PORT}`;
      }

      services = `postgres redis ${services.join(' ')}`;
      const branch = args.branch || process.env.BRANCH.trim();
      const dockerFilePath = path.resolve(__dirname, './docker-compose.e2e.yml');
      await execute(
        // eslint-disable-next-line max-len
        `SET BRANCH=${branch}&& docker-compose -f ${dockerFilePath} rm -f && docker-compose -f ${dockerFilePath} up --build ${services}`,
        true,
      );
    },
  )
  .version(false)
  .command('info', 'Show all of the environment infos', {}, () => {
    loadLocalEnvs(true);
    loadCWDEnvs(true);

    console.info(`
DATABASE:
DB_NAME=${process.env.DB_NAME}
DB_PORT=${process.env.DB_PORT}
DB_USERNAME=${process.env.DB_USERNAME}
DB_PASSWORD=${process.env.DB_PASSWORD}

REDIS:
REDIS_PORT=${process.env.REDIS_PORT}

PAYMENT_GATEWAY_SERVICE:
PORT=${process.env.PAYMENT_GATEWAY_SERVICE_PORT}

TRANSACTION_SERVICE:
PORT=${process.env.TRANSACTION_SERVICE_PORT}

TRAFFIC_PROTECTION_ENGINE:
PORT=${process.env.TRAFFIC_PROTECTION_ENGINE_PORT}

RATE_SERVICE:
PORT=${process.env.RATE_SERVICE_PORT}
`);
  })
  .help()
  .strictCommands()
  .alias('help', 'h').argv;
