import { Column, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/modules/vtdTable/consts/modelColumnAliases';
import { UNSIGNED_FLOAT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { CharacterType } from 'src/modules/vtdTable/models/characterType.model';

@Table
export class Mark extends CharacterType<Mark> {
  @Column(COLUMN_ALIASES.title.options)
  [COLUMN_ALIASES.title.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.nextMarkDistance.name]: string | null;
}
