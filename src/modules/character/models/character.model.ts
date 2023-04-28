import { Column, DataType, Table } from 'sequelize-typescript';
import { VtdTable } from 'src/common/models/vtdTable.model';

@Table
export class Character extends VtdTable<Character> {
  @Column({ type: DataType.STRING, field: 'weldType' })
  'Тип сварного шва': string | null;
}
