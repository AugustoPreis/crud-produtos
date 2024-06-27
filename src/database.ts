import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { getDBConnection } from './utils/db';

const connection = getDBConnection();

export const Database = new DataSource({
  ...connection,
  type: 'postgres',
  synchronize: false,
  logging: process.env.LOG_SQL === 'TRUE',
  entities: [`${__dirname}/models/**.{js,ts}`],
});