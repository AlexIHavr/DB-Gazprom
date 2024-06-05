import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { VTD_ID_OPTIONS } from 'common/consts/modelColumnOptions.const';
import { Vtd } from '@vtd/models/vtd.model';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { VtdTable } from '@vtdTable/models/vtdTable.model';
import { VTD_ID_PREV } from '@vtdTable/modules/form/joining/const/attributes.const';

@Table
export class Joining extends VtdTable<Joining> {
  @ForeignKey(() => Vtd)
  @Column(VTD_ID_OPTIONS)
  public [VTD_ID_PREV]: string;

  @Column(COLUMN_ALIASES.tubeNumber.options)
  public [COLUMN_ALIASES.tubeNumber.name]: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public [COLUMN_ALIASES.tubeNumberPrev.name]: string;
}
