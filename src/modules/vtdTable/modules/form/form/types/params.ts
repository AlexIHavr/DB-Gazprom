import { Character } from 'src/modules/vtdTable/modules/report/character/models/character.model';
import { Anomaly } from 'src/modules/vtdTable/modules/report/anomaly/models/anomaly.model';
import { Weld } from 'src/modules/vtdTable/modules/report/weld/models/weld.model';

import { CreateDto } from '../dto/create.dto';
import { Form } from '../models/form.model';

export type GetCreatedFormRowsParams = CreateDto & {
  formModel: typeof Form;
  characterModel: typeof Character;
  anomalyModel: typeof Anomaly;
  weldModel: typeof Weld;
};
