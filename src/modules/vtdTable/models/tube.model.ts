import { Column } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import { HOUR_OPTIONS, UNSIGNED_FLOAT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { StringPrimitive } from 'src/common/types/primitives';

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
