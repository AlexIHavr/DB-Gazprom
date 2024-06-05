import { Column, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { Defect } from '@vtdTable/models/defect.model';

@Table
export class Character extends Defect<Character> {
  @Column(COLUMN_ALIASES.weldType.options)
  public [COLUMN_ALIASES.weldType.name]: string | null;
}
