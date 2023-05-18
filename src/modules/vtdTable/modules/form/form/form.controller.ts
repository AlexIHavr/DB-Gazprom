import { Body, Controller, Post } from '@nestjs/common';
import { VtdIdDto } from 'src/common/dto/vtdId.dto';
import { VtdTableController } from 'src/modules/vtdTable/vtdTable.controller';

import { FormService } from './form.service';

@Controller('form')
export class FormController extends VtdTableController {
  constructor(readonly formService: FormService) {
    super(formService);
  }

  @Post('create')
  create(@Body() createDto: VtdIdDto) {
    this.formService.create(createDto);
  }
}
