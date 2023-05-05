import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import { VtdTable } from 'src/modules/vtdTable/models/VtdTable.model';

@Table
export class Summary extends VtdTable<Summary> {
  @Column(COLUMN_ALIASES.title.options)
  [COLUMN_ALIASES.title.name]: string | null;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.summaryValue.name]: string | null;
}
