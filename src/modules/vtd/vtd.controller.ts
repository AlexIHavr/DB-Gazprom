import { Body, Controller, Get, Post, BadRequestException } from '@nestjs/common';
import { Vtd } from './models/vtd.model';
import { CreateAllDto } from './types/dto';
import { VtdService } from './vtd.service';

@Controller('vtd')
export class VtdController {
  constructor(private readonly vtdService: VtdService) {}

  @Get('getAll')
  async getAll(): Promise<Vtd[]> {
    try {
      return await this.vtdService.getAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  //on deleting
  @Post('createAll')
  createAll(@Body() createAllDto: CreateAllDto) {
    return this.vtdService.createAll(createAllDto);
  }
}
