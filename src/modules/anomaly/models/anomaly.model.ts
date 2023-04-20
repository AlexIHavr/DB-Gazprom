import { Column, DataType, Table } from 'sequelize-typescript';
import { HOUR_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { Base } from 'src/common/models/base.model';

@Table
export class Anomaly extends Base<Anomaly> {
  @Column({ type: DataType.SMALLINT, field: 'fromLongWeldToStart' })
  'От продольного шва до точки начала дефекта, мм': number | null;

  @Column({ ...HOUR_OPTIONS, allowNull: false, field: 'startOrientation' })
  'Ориентация точки начала дефекта, ч:мин': string;

  @Column({ type: DataType.TEXT, field: 'tubeComment' })
  'Комментарий к трубе': string | null;
}
