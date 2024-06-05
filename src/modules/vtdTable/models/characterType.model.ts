import { Column } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';

import { Coordinate } from './coordinate.model';

export class CharacterType<TModelAttributes extends object> extends Coordinate<TModelAttributes> {
  @Column(COLUMN_ALIASES.distance.options)
  public [COLUMN_ALIASES.distance.name]: number;

  @Column(COLUMN_ALIASES.characterType.options)
  public [COLUMN_ALIASES.characterType.name]: string;

  @Column(COLUMN_ALIASES.abbreviationType.options)
  public [COLUMN_ALIASES.abbreviationType.name]: string;

  @Column(COLUMN_ALIASES.description.options)
  public [COLUMN_ALIASES.description.name]: string | null;
}
