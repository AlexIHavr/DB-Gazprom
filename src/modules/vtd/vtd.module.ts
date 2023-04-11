import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VtdController } from './vtd.controller';
import { Vtd } from './models/vtd.model';
import { VtdService } from './vtd.service';

@Module({
  controllers: [VtdController],
  providers: [VtdService],
  imports: [SequelizeModule.forFeature([Vtd])],
})
export class VtdModule {}
