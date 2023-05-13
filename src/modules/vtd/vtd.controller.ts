import { Controller, Get, Delete, Body, UseInterceptors } from '@nestjs/common/decorators';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { VtdIdDto } from 'src/common/dto/vtdId.dto';
import { CreateOneDto } from './dto/createOne.dto';

import { Vtd } from './models/vtd.model';
import { VtdService } from './vtd.service';

@Controller('vtd')
export class VtdController {
  constructor(private readonly vtdService: VtdService) {}

  @Get('getAll')
  getAll(): Promise<Vtd[]> {
    return this.vtdService.getAll();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('createOne')
  createOne(@Body() createOne: CreateOneDto): Promise<Vtd> {
    return this.vtdService.createOne(createOne);
  }

  @Delete('deleteOneById')
  deleteOneById(@Body() deleteByIdDto: VtdIdDto): Promise<number> {
    return this.vtdService.deleteOneById(deleteByIdDto);
  }
}
