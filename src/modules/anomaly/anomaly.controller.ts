import { Controller } from '@nestjs/common';
import { Body, Get, Post, Query } from '@nestjs/common/decorators';
import { AnomalyService } from './anomaly.service';
import { GetAllByVtdIdDto } from './dto/getAllByVtdId.dto';
import { serverErrorWrapper } from 'src/common/helpers/serverErrorWrapper.';
import { CreateAllDto } from './dto/createAll.dto';
import { Anomalies } from './types/anomalies';

@Controller('anomaly')
export class AnomalyController {
  constructor(private readonly anomalyService: AnomalyService) {}

  @Get('getAllByVtdId')
  async getAllByVtdId(@Query() getAnomaliesDto: GetAllByVtdIdDto): Promise<Anomalies> {
    return serverErrorWrapper(async () => await this.anomalyService.getAllByVtdId(getAnomaliesDto));
  }

  @Post('createAll')
  async createAll(@Body() createAllDto: CreateAllDto): Promise<Anomalies> {
    return serverErrorWrapper(async () => await this.anomalyService.createAll(createAllDto));
  }
}
