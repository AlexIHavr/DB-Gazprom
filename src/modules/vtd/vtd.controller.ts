import { Controller, Get } from '@nestjs/common';
import { Vtd } from './models/vtd.model';
import { VtdService } from './vtd.service';

@Controller('vtd')
export class VtdController {
  constructor(private readonly vtdService: VtdService) {}

  @Get('getAll')
  getAll(): Promise<Vtd[]> {
    return this.vtdService.getAll();
  }
}
