/* eslint-disable max-len,@typescript-eslint/no-var-requires */

const { exec, spawn } = require('child_process');
const { pour } = require('std-pour');
const fs = require('fs');
const path = require('path');

/* payment-gateway:
network_mode: "host"
build:
    context: https://${GIT_USERNAME}:${GIT_PASSWORD}@gitlab.com/xcoins-tech/xcoins-gateway/xcoin-api-payment-gateway.git#${BRANCH}
        dockerfile: .test.Dockerfile
args:
    GIT_USERNAME: ${GIT_USERNAME}
        GIT_PASSWORD: ${GIT_PASSWORD}
            image: payment-gateway
entrypoint: ["bash", "-c", "sleep 30 && npm run migrate && node dist/main"]
env_file:
    - .env
depends_on:
    - postgres
    - redis
environment:
    PROJECT_NAME: 'xcoins-payment-gateway'
PORT: ${PAYMENT_GATEWAY_PORT}

    rate-service:
network_mode: "host"
build:
    context: https://${GIT_USERNAME}:${GIT_PASSWORD}@gitlab.com/xcoins-tech/xcoins-core-services/xcoins-rate-service.git#${BRANCH}
        dockerfile: .test.Dockerfile
args:
    GIT_USERNAME: ${GIT_USERNAME}
        GIT_PASSWORD: ${GIT_PASSWORD}
            image: rate-service
entrypoint: ["bash", "-c", "sleep 30 && node dist/main"]
env_file:
    - .env
depends_on:
    - postgres
    - redis
environment:
    PROJECT_NAME: 'xcoins-rate-service'
PORT: ${RATE_SERVICE_PORT}

    test_container:
        network_mode: "host"
build:
    context: https://${GIT_USERNAME}:${GIT_PASSWORD}@gitlab.com/xcoins-tech/xcoins-core-services/shared-libraries.git
        dockerfile: .e2e.Dockerfile
args:
    GIT_USERNAME: ${GIT_USERNAME}
        GIT_PASSWORD: ${GIT_PASSWORD}
            BRANCH: ${BRANCH}
                env_file:
                    - .env
depends_on:
    - postgres
    - redis
    - transaction-service
    - rate-service
    - payment-gateway */

/* https://runnable.com/blog/how-to-achieve-practical-end-to-end-testing */

// eslint-disable-next-line default-param-last
async function execute(command, args = '', stdOut, stdErr, follow = true) {
  return new Promise((resolve, reject) => {
    if (follow) {
      pour(
        command,
        args.split(' ') || [],
        {
          timeout: 100000,
          shell: true,
        },
        stdOut && { write: (data) => stdOut(Buffer.from(data).toString()) },
        stdErr && { write: (data) => stdOut(Buffer.from(data).toString()) },
      ).then((code) => (code > 0 ? reject() : resolve()));
    } else {
      exec(`${command} ${args}`, (error, stdout, stderr) => {
        if (error) {
          return reject();
        }
        if (stderr) {
          return reject();
        }
        return resolve(stdout);
      });
    }
  });
}

// eslint-disable-next-line no-shadow
function printFile(path, project) {
  try {
    const file = JSON.parse(Buffer.from(fs.readFileSync(`./${path}`)).toString());
    const { numFailedTestSuites, numFailedTests, numPassedTestSuites, numPassedTests, success, testResults } = file;
    testResults
      .filter((t) => t.status !== 'passed')
      .forEach((data) => {
        console.log('Test Failed :');
        console.log('project: ', project);
        console.log(data.message);
        console.log(data.summary);
        console.log(data.assertionResults.filter((t) => t.status !== 'passed'));
      });
  } catch (e) {
    /* empty */
  }
}

async function unitTest(dir) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  await execute(`cd ./${dir} && jest --json --outputFile=../${dir}-unit.json && cd ..`).catch(() => {});
  return `${dir}-unit.json`;
}

async function e2eTest(dir) {
  await execute(
    `cd ./${dir} && jest --config ./test/jest-e2e.json --json --outputFile=../${dir}-e2e.json && cd ..`,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ).catch(() => {});
  return `${dir}-e2e.json`;
}

const run = async () => {
  // await execute("jest --json --outputFile=-example-name.json").catch(() => {});
  const files = [];
  files.push(await unitTest('api-gateway'), await e2eTest('api-gateway'));
  files.push(await unitTest('transactions-service'), await e2eTest('transactions-service'));
  files.push(await unitTest('rate-service'), await e2eTest('rate-service'));
  files.forEach((f) => printFile(f, f));
};

run();
