import { env } from 'node:process';

export default {
  user: env['POSTGRES_USER'],
  password: env['POSTGRES_PASSWORD'],
  host: env['POSTGRES_HOST'],
  port: env['POSTGRES_PORT'],
  database: env['POSTGRES_DB'],
  dev: env['POSTGRES_DEV'],
  debug: env['POSTGRES_DEBUG'],
};
