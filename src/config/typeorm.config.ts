
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  host: 'localhost',
  type: 'postgres',
  port: 5432,
  database: 'jac-psol',
  username: 'postgres',
  password: 'postgres',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};