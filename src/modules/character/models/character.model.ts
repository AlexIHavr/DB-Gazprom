import { Column, DataType, Table } from 'sequelize-typescript';
import { Base } from 'src/common/models/base.model';

@Table
export class Character extends Base<Character> {
  @Column({ type: DataType.STRING, field: 'weldType' })
  'Тип сварного шва': string | null;
}
