import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Document } from '../src/documents/document.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'sicoe',
  password: process.env.DB_PASS || 'sicoe',
  database: process.env.DB_NAME || 'sicoe',
  entities: [Document],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false
});

export default dataSource;
