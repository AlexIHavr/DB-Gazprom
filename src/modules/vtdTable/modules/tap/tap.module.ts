import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';
import { Tap } from './models/tap.model';
import { TapController } from './tap.controller';
import { TapService } from './tap.service';

@Module({
  controllers: [TapController],
  providers: [TapService],
  imports: [SequelizeModule.forFeature([Tap, Vtd])],
})
export class TapModule {}
