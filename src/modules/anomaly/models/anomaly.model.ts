import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import { HOUR_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { Defect } from 'src/common/models/defect.model';

@Table
export class Anomaly extends Defect<Anomaly> {
  @Column({ type: DataType.SMALLINT })
  [COLUMN_ALIASES.fromLongWeldToStart.name]: number | null;

  @Column({ ...HOUR_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.startOrientation.name]: string;

  @Column({ type: DataType.TEXT })
  [COLUMN_ALIASES.tubeComment.name]: string | null;
}
