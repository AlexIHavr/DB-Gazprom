import { Body, Get, Post, Query, Delete } from '@nestjs/common/decorators';

import { CreateAllDto } from './dto/createAll.dto';
import { VtdTableService } from './vtdTable.service';
import { VtdTableRows } from './types/vtdTable';
import { VtdIdDto } from 'src/common/dto/vtdId.dto';

export class VtdTableController {
  constructor(readonly vtdTableService: VtdTableService) {}

  @Get('getAllByVtdId')
  getAllByVtdId(@Query() getAllByVtdIdDto: VtdIdDto): Promise<VtdTableRows> {
    return this.vtdTableService.getAllByVtdId(getAllByVtdIdDto);
  }

  @Post('createAll')
  createAll(@Body() createAllDto: CreateAllDto): Promise<VtdTableRows> {
    return this.vtdTableService.createAll(createAllDto);
  }

  @Delete('deleteAllByVtdId')
  deleteAllByVtdId(@Body() deleteAllByVtdIdDto: VtdIdDto): Promise<number> {
    return this.vtdTableService.deleteAllByVtdId(deleteAllByVtdIdDto);
  }
}
