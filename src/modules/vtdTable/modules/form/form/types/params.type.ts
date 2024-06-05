import { Character } from '@vtdTable/modules/report/character/models/character.model';
import { Anomaly } from '@vtdTable/modules/report/anomaly/models/anomaly.model';
import { Weld } from '@vtdTable/modules/report/weld/models/weld.model';
import { CreateDto } from '@vtdTable/modules/form/form/dto/create.dto';
import { Form } from '@vtdTable/modules/form/form/models/form.model';

export type GetCreatedFormRowsParams = CreateDto & {
  formModel: typeof Form;
  characterModel: typeof Character;
  anomalyModel: typeof Anomaly;
  weldModel: typeof Weld;
};
