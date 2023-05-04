import { Column, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import { StringOrNullPrimitive } from 'src/common/types/primitives';
import { Defect } from 'src/common/models/defect.model';

@Table
export class Character extends Defect<Character> {
  @Column(COLUMN_ALIASES.weldType.options)
  [COLUMN_ALIASES.weldType.name]: StringOrNullPrimitive;
}
