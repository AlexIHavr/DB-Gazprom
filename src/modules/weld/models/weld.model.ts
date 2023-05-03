import { Column, DataType, Table } from 'sequelize-typescript';
import { UNSIGNED_FLOAT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { AnomaliesCountColumn, ANOMALIES_COUNT_COLUMN, WeldTypeColumn, WELD_TYPE_COLUMN } from 'src/common/consts/modelColumns';
import { Tube } from 'src/common/models/tube.model';

@Table
export class Weld extends Tube<Weld> {
  @Column(ANOMALIES_COUNT_COLUMN.options)
  [ANOMALIES_COUNT_COLUMN.name]: AnomaliesCountColumn;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'SMYS' })
  'SMYS, МПа': number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'SMTS' })
  'SMTS, МПа': number;

  @Column({ type: DataType.STRING, allowNull: false, field: 'plotCategory' })
  'Категория участка': string;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'constructionalFactor' })
  'Конструкционный фактор': number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'materialReliability' })
  'Коэффициент надёжности по материалу': number;

  @Column({ type: DataType.STRING, field: 'isolationType' })
  'Тип изоляции': string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'square' })
  'Площадь, %': number | null;

  @Column(WELD_TYPE_COLUMN.options)
  [WELD_TYPE_COLUMN.name]: WeldTypeColumn;

  @Column({ type: DataType.STRING, field: 'steelMark' })
  'Марка стали': string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'temperatureDifference' })
  'Температурный перепад': number | null;
}
