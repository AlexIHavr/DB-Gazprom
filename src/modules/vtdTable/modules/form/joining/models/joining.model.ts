import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { VTD_ID_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { Vtd } from 'src/modules/vtd/models/vtd.model';
import { COLUMN_ALIASES } from 'src/modules/vtdTable/consts/modelColumnAliases';
import { VtdTable } from 'src/modules/vtdTable/models/vtdTable.model';

import { VTD_ID_PREV } from '../const/attributes';

@Table
export class Joining extends VtdTable<Joining> {
  @ForeignKey(() => Vtd)
  @Column(VTD_ID_OPTIONS)
  [VTD_ID_PREV]: string;

  @Column(COLUMN_ALIASES.tubeNumber.options)
  [COLUMN_ALIASES.tubeNumber.name]: string;

  @Column({ type: DataType.STRING, allowNull: false })
  [COLUMN_ALIASES.tubeNumberPrev.name]: string;
}
