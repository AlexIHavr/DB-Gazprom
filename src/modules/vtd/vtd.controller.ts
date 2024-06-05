import { Controller, Get, Delete, Body, Post } from '@nestjs/common/decorators';
import { VtdIdDto } from 'common/dto/vtdId.dto';

import { CreateOneDto } from './dto/createOne.dto';
import { Vtd } from './models/vtd.model';
import { VtdService } from './vtd.service';

@Controller('vtd')
export class VtdController {
  constructor(private readonly vtdService: VtdService) {}

  @Get('getAll')
  public getAll(): Promise<Vtd[]> {
    return this.vtdService.getAll();
  }

  @Post('createOne')
  public createOne(@Body() createOne: CreateOneDto): Promise<Vtd> {
    return this.vtdService.createOne(createOne);
  }

  @Delete('deleteOneById')
  public deleteOneById(@Body() deleteByIdDto: VtdIdDto): Promise<number> {
    return this.vtdService.deleteOneById(deleteByIdDto);
  }
}
