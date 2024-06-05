import { Body, Get, Post, Query, Delete } from '@nestjs/common/decorators';
import { VtdIdDto } from 'common/dto/vtdId.dto';

import { CreateAllDto } from './dto/createAll.dto';
import { VtdTableRows } from './types/vtdTable.type';
import { VtdTableService } from './vtdTable.service';

export class VtdTableController {
  constructor(private readonly vtdTableService: VtdTableService) {}

  @Get('getAllByVtdId')
  public getAllByVtdId(@Query() getAllByVtdIdDto: VtdIdDto): Promise<VtdTableRows> {
    return this.vtdTableService.getAllByVtdId(getAllByVtdIdDto);
  }

  @Post('createAll')
  public createAll(@Body() createAllDto: CreateAllDto): Promise<VtdTableRows> {
    return this.vtdTableService.createAll(createAllDto);
  }

  @Delete('deleteAllByVtdId')
  public deleteAllByVtdId(@Body() deleteAllByVtdIdDto: VtdIdDto): Promise<number> {
    return this.vtdTableService.deleteAllByVtdId(deleteAllByVtdIdDto);
  }
}
