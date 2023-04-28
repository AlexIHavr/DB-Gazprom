import { BelongsTo, Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import { Vtd } from 'src/modules/vtd/models/vtd.model';
import {
  HOUR_OPTIONS,
  ID_OPTIONS,
  NEGATIVE_FLOAT_OPTIONS,
  UNSIGNED_FLOAT_OPTIONS,
  UNSIGNED_INTEGER_OPTIONS,
  UNSIGNED_SMALLINT_OPTIONS,
  VTD_ID_OPTIONS,
} from '../consts/modelColumnOptions';

export class VtdTable<TModelAttributes extends object = object> extends Model<TModelAttributes> {
  @Column(ID_OPTIONS)
  id: string;

  @ForeignKey(() => Vtd)
  @Column(VTD_ID_OPTIONS)
  vtdId: string;

  @BelongsTo(() => Vtd)
  vtd: Vtd;

  @Column({ ...UNSIGNED_INTEGER_OPTIONS, unique: true })
  SSID: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'distance' })
  'Расстояние, м': number;

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

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, field: 'minDistanceToGirthWeld' })
  'Минимальное расстояние до кольцевого шва, мм': number | null;

  @Column({ type: DataType.STRING, allowNull: false, field: 'tubeNumber' })
  'Номер трубы': string;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'tubeLength' })
  'Длина трубы, м': number;

  @Column({ type: DataType.STRING, allowNull: false, field: 'type' })
  Тип: string;

  @Column({ ...HOUR_OPTIONS, field: 'inputLongWeld' })
  'Входящий ПШ, ч:мин': string | null;

  @Column({ ...HOUR_OPTIONS, field: 'outputLongWeld' })
  'Выходящий ПШ, ч:мин': string | null;

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

  @Column({ ...HOUR_OPTIONS, allowNull: false, field: 'centerOrientation' })
  'Ориентация центра, ч:мин': string;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'thickness' })
  'Толщина, мм': number;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, field: 'length' })
  'Длина, мм': number | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, field: 'width' })
  'Ширина, мм': number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, field: 'depth' })
  'Глубина, %': number | null;

  @Column({ type: DataType.CHAR(3), field: 'position' })
  Расположение: string | null;

  @Column({ type: DataType.TEXT, field: 'comment' })
  Комментарий: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 51, max: 55 }, field: 'latitude' })
  Широта: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 23, max: 32 }, field: 'longitude' })
  Долгота: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'altitude' })
  Высота: number;

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

  @Column({ type: DataType.CHAR(3), field: 'danger' })
  Опасность: string | null;
}
