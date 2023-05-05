import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

import { MarkController } from './mark.controller';
import { MarkService } from './mark.service';
import { Mark } from './models/mark.model';

@Module({
  controllers: [MarkController],
  providers: [MarkService],
  imports: [SequelizeModule.forFeature([Mark, Vtd])],
})
export class MarkModule {}
