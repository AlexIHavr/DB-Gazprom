import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { GetPipelineTableDto } from './dto/getPipelineTable.dto';
import { LoadPipelineTableDto } from './dto/loadPipelineTable.dto';
import { VtdService } from './vtd.service';

@Controller('vtd')
export class VtdController {
  constructor(private readonly vtdService: VtdService) {}

  @Get('getVtds')
  getVtds() {
    return this.vtdService.getVtds();
  }

  @Get('getPipelineTable')
  getPipelineTable(@Query() getPipelineTableDto: GetPipelineTableDto) {
    return this.vtdService.getPipelineTable(getPipelineTableDto);
  }

  @Put('loadPipelineTable')
  loadPipelineTable(@Body() loadPipelineTableDto: LoadPipelineTableDto) {
    return this.vtdService.loadPipelineTable(loadPipelineTableDto);
  }
}
