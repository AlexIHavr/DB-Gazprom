import { Column } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';

import { VtdTable } from './VtdTable.model';

export class CharacterType<TModelAttributes extends object> extends VtdTable<TModelAttributes> {
  @Column(COLUMN_ALIASES.distance.options)
  [COLUMN_ALIASES.distance.name]: number;

  @Column(COLUMN_ALIASES.characterType.options)
  [COLUMN_ALIASES.characterType.name]: string;

  @Column(COLUMN_ALIASES.abbreviationType.options)
  [COLUMN_ALIASES.abbreviationType.name]: string;

  @Column(COLUMN_ALIASES.description.options)
  [COLUMN_ALIASES.description.name]: string | null;
}
