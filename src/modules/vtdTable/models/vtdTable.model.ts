import { BelongsTo, Column, ForeignKey, Model } from 'sequelize-typescript';
import { ID_OPTIONS, UNSIGNED_INTEGER_OPTIONS, VTD_ID_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

import { COLUMN_ALIASES } from '../consts/modelColumnAliases';

export class VtdTable<TModelAttributes extends object = object> extends Model<TModelAttributes> {
  @Column(ID_OPTIONS)
  id: string;

  @Column({ ...UNSIGNED_INTEGER_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.number.name]: number;

  @ForeignKey(() => Vtd)
  @Column(VTD_ID_OPTIONS)
  vtdId: string;

  @BelongsTo(() => Vtd)
  vtd: Vtd;
}
