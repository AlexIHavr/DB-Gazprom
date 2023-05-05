import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import { UNSIGNED_FLOAT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { CharacterType } from 'src/modules/vtdTable/models/characterType.model';

@Table
export class Mark extends CharacterType<Mark> {
  @Column({ type: DataType.STRING, allowNull: false })
  [COLUMN_ALIASES.markName.name]: string;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.nextMarkDistance.name]: string | null;
}
