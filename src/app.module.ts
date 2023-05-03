import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { VtdModule } from './modules/vtd/vtd.module';
import { Vtd } from './modules/vtd/models/vtd.model';
import { AnomalyModule } from './modules/anomaly/anomaly.module';
import { Anomaly } from './modules/anomaly/models/anomaly.model';
import { CharacterModule } from './modules/character/character.module';
import { WeldModule } from './modules/weld/weld.module';
import { BranchModule } from './modules/branch/branch.module';

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
      models: [Vtd, Anomaly],
    }),
    VtdModule,
    AnomalyModule,
    CharacterModule,
    WeldModule,
    BranchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
