import 'dotenv/config';
import Fastify from 'fastify';
import CronRun from './crons/crons';

const fastify = Fastify({ logger: true });

const PORT = process.env.PORT || 3000;

fastify.listen(PORT, '0.0.0.0', () => {
  console.log('Cron server started');

  // eslint-disable-next-line no-new
  new CronRun();
});
