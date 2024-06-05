import { Column, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { UNSIGNED_FLOAT_OPTIONS } from 'common/consts/modelColumnOptions.const';
import { CharacterType } from '@vtdTable/models/characterType.model';

@Table
export class Mark extends CharacterType<Mark> {
  @Column(COLUMN_ALIASES.title.options)
  public [COLUMN_ALIASES.title.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  public [COLUMN_ALIASES.nextMarkDistance.name]: string | null;
}
