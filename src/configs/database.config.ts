import { registerAs } from '@nestjs/config';
import { DatabaseConfigType } from './config.type';

const databaseConfig = registerAs('database', (): DatabaseConfigType => ({
  uri: process.env.MONGODB_URI!,
}));

export default databaseConfig;
