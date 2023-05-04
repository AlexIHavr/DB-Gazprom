import { Column } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '../consts/modelColumnAliases';

import { StringPrimitive } from '../types/primitives';

import { HOUR_OPTIONS, UNSIGNED_FLOAT_OPTIONS } from './../consts/modelColumnOptions';
import { VtdTable } from './VtdTable.model';

export class Tube<TModelAttributes extends object> extends VtdTable<TModelAttributes> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.distance.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.tubeLength.name]: number;

  @Column(COLUMN_ALIASES.type.options)
  [COLUMN_ALIASES.type.name]: StringPrimitive;

  @Column({ ...HOUR_OPTIONS })
  [COLUMN_ALIASES.inputLongWeld.name]: string | null;

  @Column({ ...HOUR_OPTIONS })
  [COLUMN_ALIASES.outputLongWeld.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.thickness.name]: number;
}
