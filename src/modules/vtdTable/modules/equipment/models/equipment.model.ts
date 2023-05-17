import { Column, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/modules/vtdTable/consts/modelColumnAliases';
import { CharacterType } from 'src/modules/vtdTable/models/characterType.model';

@Table
export class Equipment extends CharacterType<Equipment> {
  @Column(COLUMN_ALIASES.tubeLength.options)
  [COLUMN_ALIASES.tubeLength.name]: number;

  @Column(COLUMN_ALIASES.equipmentLength.options)
  [COLUMN_ALIASES.equipmentLength.name]: number | null;
}
