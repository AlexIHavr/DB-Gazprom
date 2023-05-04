import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

import { Weld } from './models/weld.model';
import { WeldController } from './weld.controller';
import { WeldService } from './weld.service';

@Module({
  controllers: [WeldController],
  providers: [WeldService],
  imports: [SequelizeModule.forFeature([Weld, Vtd])],
})
export class WeldModule {}
