/* eslint-disable no-underscore-dangle */
import { Options, Sequelize } from 'sequelize';

export async function setupDB(prefix: string, workers = 1, start = 0) {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: false,
    autoLoadModels: false,
  } as Options);

  const queryInterface = sequelize.getQueryInterface();

  const databases: string[] = [];

  for (let i = start; i < workers; i++) {
    databases.push(`${prefix}-database-${i + 1}`);
  }

  await Promise.all(databases.map((database) => queryInterface.createDatabase(database)));

  await sequelize.close();
}
