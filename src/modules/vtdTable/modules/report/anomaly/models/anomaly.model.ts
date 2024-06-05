import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { Defect } from '@vtdTable/models/defect.model';

@Table
export class Anomaly extends Defect<Anomaly> {
  @Column(COLUMN_ALIASES.fromLongWeldToStart.options)
  public [COLUMN_ALIASES.fromLongWeldToStart.name]: number | null;

  @Column(COLUMN_ALIASES.startOrientation.options)
  public [COLUMN_ALIASES.startOrientation.name]: string | null;

  @Column({ type: DataType.TEXT })
  public [COLUMN_ALIASES.tubeComment.name]: string | null;
}
