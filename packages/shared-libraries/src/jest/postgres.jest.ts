// eslint-disable-next-line import/no-extraneous-dependencies
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { StoppedTestContainer } from 'testcontainers';

let CONTAINER: StartedPostgreSqlContainer;

export const NO_POSTGRES = process.env.NO_POSTGRES === '1';

export async function startPostgres(database: string): Promise<StartedPostgreSqlContainer> {
  CONTAINER = await new PostgreSqlContainer('postgres:15.5-alpine').withDatabase(database).start();

  return CONTAINER;
}

export async function stopPostgres(): Promise<StoppedTestContainer> {
  return CONTAINER.stop({
    timeout: 10000,
    removeVolumes: true,
  });
}
