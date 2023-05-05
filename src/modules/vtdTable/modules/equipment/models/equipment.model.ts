import { Column, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import { UNSIGNED_FLOAT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { CharacterType } from 'src/modules/vtdTable/models/characterType.model';

@Table
export class Equipment extends CharacterType<Equipment> {
  @Column(COLUMN_ALIASES.tubeLength.options)
  [COLUMN_ALIASES.tubeLength.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.equipmentLength.name]: number | null;
}
