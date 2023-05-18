import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { Branch } from './models/branch.model';

@Module({
  controllers: [BranchController],
  providers: [BranchService],
  imports: [SequelizeModule.forFeature([Branch, Vtd])],
})
export class BranchModule {}
