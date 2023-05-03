import { Column, Table } from 'sequelize-typescript';
import { WeldTypeColumn, WELD_TYPE_COLUMN } from 'src/common/consts/modelColumns';
import { Defect } from 'src/common/models/defect.model';

@Table
export class Character extends Defect<Character> {
  @Column(WELD_TYPE_COLUMN.options)
  [WELD_TYPE_COLUMN.name]: WeldTypeColumn;
}
