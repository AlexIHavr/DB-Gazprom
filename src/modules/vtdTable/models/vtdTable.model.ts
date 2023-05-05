import { BelongsTo, Column, ForeignKey, Model } from 'sequelize-typescript';
import { ID_OPTIONS, VTD_ID_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { Vtd } from 'src/modules/vtd/models/vtd.model';

export class VtdTable<TModelAttributes extends object = object> extends Model<TModelAttributes> {
  @Column(ID_OPTIONS)
  id: string;

  @ForeignKey(() => Vtd)
  @Column(VTD_ID_OPTIONS)
  vtdId: string;

  @BelongsTo(() => Vtd)
  vtd: Vtd;
}
