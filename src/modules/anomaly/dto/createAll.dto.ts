import { IsUUID } from 'class-validator';
import { CreationAttributes } from 'src/common/types/utility';
import { Anomaly } from '../models/anomaly.model';

export class CreateAllDto {
  @IsUUID(4)
  readonly vtdId: string;

  readonly anomalies: CreationAttributes<Anomaly>[];
}
