import { Column, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { CharacterType } from '@vtdTable/models/characterType.model';

@Table
export class Equipment extends CharacterType<Equipment> {
  @Column(COLUMN_ALIASES.tubeLength.options)
  public [COLUMN_ALIASES.tubeLength.name]: number;

  @Column(COLUMN_ALIASES.equipmentLength.options)
  public [COLUMN_ALIASES.equipmentLength.name]: number | null;
}
