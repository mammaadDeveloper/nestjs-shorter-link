import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  url: process.env.DATABASE_URL || 'postgres://localhost:5432/shorter_link',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
}));