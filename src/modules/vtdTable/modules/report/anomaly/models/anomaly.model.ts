import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/modules/vtdTable/consts/modelColumnAliases';
import { Defect } from 'src/modules/vtdTable/models/defect.model';

@Table
export class Anomaly extends Defect<Anomaly> {
  @Column(COLUMN_ALIASES.fromLongWeldToStart.options)
  [COLUMN_ALIASES.fromLongWeldToStart.name]: number | null;

  @Column(COLUMN_ALIASES.startOrientation.options)
  [COLUMN_ALIASES.startOrientation.name]: string | null;

  @Column({ type: DataType.TEXT })
  [COLUMN_ALIASES.tubeComment.name]: string | null;
}
