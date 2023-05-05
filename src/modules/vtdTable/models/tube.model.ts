import { Column } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import { HOUR_OPTIONS, UNSIGNED_FLOAT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { Coordinate } from './coordinate.model';

export class Tube<TModelAttributes extends object> extends Coordinate<TModelAttributes> {
  @Column(COLUMN_ALIASES.distance.options)
  [COLUMN_ALIASES.distance.name]: number;

  @Column(COLUMN_ALIASES.tubeLength.options)
  [COLUMN_ALIASES.tubeLength.name]: number;

  @Column(COLUMN_ALIASES.type.options)
  [COLUMN_ALIASES.type.name]: string;

  @Column({ ...HOUR_OPTIONS })
  [COLUMN_ALIASES.inputLongWeld.name]: string | null;

  @Column({ ...HOUR_OPTIONS })
  [COLUMN_ALIASES.outputLongWeld.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.thickness.name]: number;
}
