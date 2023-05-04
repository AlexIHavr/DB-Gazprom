import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { VtdModule } from './modules/vtd/vtd.module';
import { VtdTableModule } from './modules/vtdTable/vtdTable.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_TYPE,
      host: process.env.HOST,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
    }),
    VtdModule,
    VtdTableModule,
  ],
})
export class AppModule {}
