import { BelongsTo, Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import {
  ID_OPTIONS,
  UNSIGNED_FLOAT_OPTIONS,
  UNSIGNED_INTEGER_OPTIONS,
  VTD_ID_OPTIONS,
} from 'src/common/consts/modelColumnOptions';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

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

  @Column({ type: DataType.STRING, allowNull: false })
  [COLUMN_ALIASES.tubeNumber.name]: string;

  @Column({ type: DataType.TEXT })
  [COLUMN_ALIASES.comment.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 51, max: 55 } })
  [COLUMN_ALIASES.latitude.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 23, max: 32 } })
  [COLUMN_ALIASES.longitude.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.altitude.name]: number;
}
