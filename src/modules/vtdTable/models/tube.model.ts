import { Column } from 'sequelize-typescript';
import { HOUR_OPTIONS, UNSIGNED_FLOAT_OPTIONS } from 'common/consts/modelColumnOptions.const';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';

import { Coordinate } from './coordinate.model';

export class Tube<TModelAttributes extends object> extends Coordinate<TModelAttributes> {
  @Column(COLUMN_ALIASES.distance.options)
  public [COLUMN_ALIASES.distance.name]: number;

  @Column(COLUMN_ALIASES.tubeLength.options)
  public [COLUMN_ALIASES.tubeLength.name]: number;

  @Column(COLUMN_ALIASES.type.options)
  public [COLUMN_ALIASES.type.name]: string;

  @Column({ ...HOUR_OPTIONS })
  public [COLUMN_ALIASES.inputLongWeld.name]: string | null;

  @Column({ ...HOUR_OPTIONS })
  public [COLUMN_ALIASES.outputLongWeld.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  public [COLUMN_ALIASES.thickness.name]: number;
}
