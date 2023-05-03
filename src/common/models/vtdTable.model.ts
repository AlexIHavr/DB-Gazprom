import { BelongsTo, Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

import { ID_OPTIONS, UNSIGNED_FLOAT_OPTIONS, UNSIGNED_INTEGER_OPTIONS, VTD_ID_OPTIONS } from '../consts/modelColumnOptions';

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

  @Column({ type: DataType.STRING, allowNull: false, field: 'tubeNumber' })
  'Номер трубы': string;

  @Column({ type: DataType.TEXT, field: 'comment' })
  Комментарий: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 51, max: 55 }, field: 'latitude' })
  Широта: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 23, max: 32 }, field: 'longitude' })
  Долгота: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'altitude' })
  Высота: number;
}
