import { Column, Table } from 'sequelize-typescript';
import { WeldTypeColumn, weldTypeColumn } from 'src/common/consts/modelColumns';
import { Defect } from 'src/common/models/defect.model';

@Table
export class Character extends Defect<Character> {
  @Column(weldTypeColumn.options)
  [weldTypeColumn.name]: WeldTypeColumn;
}
