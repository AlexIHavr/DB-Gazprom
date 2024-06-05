import { BelongsTo, Column, ForeignKey, Model } from 'sequelize-typescript';
import {
  ID_OPTIONS,
  UNSIGNED_INTEGER_OPTIONS,
  VTD_ID_OPTIONS,
} from 'common/consts/modelColumnOptions.const';
import { Vtd } from '@vtd/models/vtd.model';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';

export class VtdTable<TModelAttributes extends object = object> extends Model<
  TModelAttributes,
  Partial<TModelAttributes>
> {
  @Column(ID_OPTIONS)
  public declare id: string;

  @Column({ ...UNSIGNED_INTEGER_OPTIONS, allowNull: false })
  public [COLUMN_ALIASES.number.name]: number;

  @ForeignKey(() => Vtd)
  @Column(VTD_ID_OPTIONS)
  public vtdId: string;

  @BelongsTo(() => Vtd)
  public vtd: Vtd;
}
