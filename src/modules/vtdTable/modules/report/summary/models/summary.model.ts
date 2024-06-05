import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { VtdTable } from '@vtdTable/models/vtdTable.model';

@Table
export class Summary extends VtdTable<Summary> {
  @Column(COLUMN_ALIASES.title.options)
  public [COLUMN_ALIASES.title.name]: string | null;

  @Column({ type: DataType.STRING })
  public [COLUMN_ALIASES.summaryValue.name]: string | null;
}
