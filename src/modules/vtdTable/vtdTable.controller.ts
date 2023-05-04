import { Body, Get, Post, Query } from '@nestjs/common/decorators';

import { GetAllByVtdIdDto } from './dto/getAllByVtdId.dto';
import { CreateAllDto } from './dto/createAll.dto';
import { VtdTableService } from './vtdTable.service';
import { VtdTableRows } from './types/vtdTable';

export class VtdTableController {
  constructor(readonly vtdTableService: VtdTableService) {}

  @Get('getAllByVtdId')
  getAllByVtdId(@Query() getAllByVtdIdDto: GetAllByVtdIdDto): Promise<VtdTableRows> {
    return this.vtdTableService.getAllByVtdId(getAllByVtdIdDto);
  }

  @Post('createAll')
  createAll(@Body() createAllDto: CreateAllDto): Promise<VtdTableRows> {
    return this.vtdTableService.createAll(createAllDto);
  }
}
