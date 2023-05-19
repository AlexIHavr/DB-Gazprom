import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';
import { Character } from 'src/modules/vtdTable/modules/report/character/models/character.model';
import { Anomaly } from 'src/modules/vtdTable/modules/report/anomaly/models/anomaly.model';
import { Weld } from 'src/modules/vtdTable/modules/report/weld/models/weld.model';

import { FormController } from './form.controller';
import { FormService } from './form.service';
import { Form } from './models/form.model';

@Module({
  controllers: [FormController],
  providers: [FormService],
  imports: [SequelizeModule.forFeature([Form, Vtd, Character, Anomaly, Weld])],
})
export class FormModule {}
