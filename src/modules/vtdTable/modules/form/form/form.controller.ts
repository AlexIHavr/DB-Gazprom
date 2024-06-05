import { Body, Controller, Post } from '@nestjs/common';
import { VtdTableController } from '@vtdTable/vtdTable.controller';

import { CreateDto } from './dto/create.dto';
import { FormService } from './form.service';
import { Form } from './models/form.model';

@Controller('form')
export class FormController extends VtdTableController {
  constructor(private readonly formService: FormService) {
    super(formService);
  }

  @Post('create')
  public create(@Body() createDto: CreateDto): Promise<Form[]> {
    return this.formService.create(createDto);
  }
}
