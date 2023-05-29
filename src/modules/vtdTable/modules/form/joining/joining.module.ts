import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

import { JoiningController } from './joining.controller';
import { JoiningService } from './joining.service';
import { Joining } from './models/joining.model';

@Module({
  controllers: [JoiningController],
  providers: [JoiningService],
  imports: [SequelizeModule.forFeature([Joining, Vtd])],
})
export class JoiningModule {}
