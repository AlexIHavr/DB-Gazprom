import { Column, DataType, Table } from 'sequelize-typescript';
import { UNSIGNED_FLOAT_OPTIONS, UNSIGNED_SMALLINT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import {
  AnomaliesCountColumn,
  ANOMALIES_COUNT_COLUMN,
  DangerCountColumn,
  DANGER_COUNT_COLUMN,
  TypeColumn,
  TYPE_COLUMN,
} from 'src/common/consts/modelColumns';
import { VtdTable } from 'src/common/models/VtdTable.model';

@Table
export class Branch extends VtdTable<Branch> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'startOdometer' })
  'Начало, м': number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'endOdometer' })
  'Конец, м': number;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, allowNull: false, field: 'segmentsCount' })
  'Число сегментов': number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'bendRadius' })
  'Радиус, м': number;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, allowNull: false, field: 'bendAngle' })
  'Угол изгиба, Град.': number;

  @Column({ type: DataType.STRING, field: 'angleInProjection' })
  'Угол в проекции, Град.': string | null;

  @Column(TYPE_COLUMN.options)
  [TYPE_COLUMN.name]: TypeColumn;

  @Column({ type: DataType.STRING, allowNull: false, field: 'angleInProjection' })
  'Направление': string;

  @Column(ANOMALIES_COUNT_COLUMN.options)
  [ANOMALIES_COUNT_COLUMN.name]: AnomaliesCountColumn;

  @Column(DANGER_COUNT_COLUMN.options)
  [DANGER_COUNT_COLUMN.name]: DangerCountColumn;
}
