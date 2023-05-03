import { Column, DataType } from 'sequelize-typescript';

import {
  HOUR_OPTIONS,
  NEGATIVE_FLOAT_OPTIONS,
  UNSIGNED_FLOAT_OPTIONS,
  UNSIGNED_SMALLINT_OPTIONS,
} from '../consts/modelColumnOptions';
import { DangerCountColumn, dangerCountColumn } from '../consts/modelColumns';

import { Tube } from './tube.model';

export class Defect<TModelAttributes extends object> extends Tube<TModelAttributes> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'fromLeftWeldToMaxPoint' })
  'От левого шва до точки максимума, м': number | null;

  @Column({ type: DataType.FLOAT, field: 'fromLeftWeldToStart' })
  'От левого шва до начала, м': number | null;

  @Column({ ...NEGATIVE_FLOAT_OPTIONS, field: 'fromRightWeldToMaxPoint' })
  'От правого шва до точки максимума, м': number | null;

  @Column({ ...NEGATIVE_FLOAT_OPTIONS, field: 'fromRightWeldToStart' })
  'От правого шва до начала, м': number | null;

  @Column({ type: DataType.SMALLINT, field: 'fromLongWeldToMaxPoint' })
  'От продольного шва до точки максимума, мм': number | null;

  @Column({ type: DataType.SMALLINT, field: 'fromLongWeldToCenter' })
  'От продольного шва до центра, мм': number | null;

  @Column({ type: DataType.SMALLINT, field: 'minDistanceToLongWeld' })
  'Минимальное расстояние до продольного шва, мм': number | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, field: 'minDistanceToWeld' })
  'Минимальное расстояние до кольцевого шва, мм': number | null;

  @Column({ type: DataType.STRING, field: 'fromRefPoint' })
  'От репера, м': string | null;

  @Column({ type: DataType.STRING, field: 'toRefPoint' })
  'До репера, м': string | null;

  @Column({ type: DataType.STRING, allowNull: false, field: 'characterType' })
  'Тип особенности': string;

  @Column({ type: DataType.STRING, field: 'characterSort' })
  'Характер особенности': string | null;

  @Column({ type: DataType.STRING, field: 'sizeClass' })
  'Класс размера': string | null;

  @Column({ type: DataType.STRING, field: 'description' })
  Описание: string | null;

  @Column({ type: DataType.STRING, allowNull: false, field: 'abbreviationType' })
  'Тип аббр.': string;

  @Column({ type: DataType.STRING, field: 'abbreviationSort' })
  'Характер аббр.': string | null;

  @Column({ type: DataType.STRING, field: 'abbreviationSizeClass' })
  'Класс размера аббр.': string | null;

  @Column({ ...HOUR_OPTIONS, field: 'maxOrientation' })
  'Ориентация точки максимума, ч:мин': string | null;

  @Column({ ...HOUR_OPTIONS, field: 'centerOrientation' })
  'Ориентация центра, ч:мин': string | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, field: 'length' })
  'Длина, мм': number | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, field: 'width' })
  'Ширина, мм': number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'depth' })
  'Глубина, %': number | null;

  @Column({ type: DataType.CHAR(3), field: 'position' })
  Расположение: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'outsideInspectionTime' })
  'Срок НО, лет': number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'PSC' })
  КБД: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'Pd' })
  'Pd, МПа': number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'MAOP' })
  'MAOP, МПа': number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'Psw' })
  'Psw, МПа': number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'Pf' })
  'Pf, МПа': number | null;

  @Column(dangerCountColumn.options)
  [dangerCountColumn.name]: DangerCountColumn;
}
