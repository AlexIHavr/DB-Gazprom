import { Column, DataType } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import {
  HOUR_OPTIONS,
  NEGATIVE_FLOAT_OPTIONS,
  UNSIGNED_FLOAT_OPTIONS,
  UNSIGNED_SMALLINT_OPTIONS,
} from 'src/common/consts/modelColumnOptions';
import { StringOrNullPrimitive } from 'src/common/types/primitives';

import { Tube } from './tube.model';

export class Defect<TModelAttributes extends object> extends Tube<TModelAttributes> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.fromLeftWeldToMaxPoint.name]: number | null;

  @Column({ type: DataType.FLOAT })
  [COLUMN_ALIASES.fromLeftWeldToStart.name]: number | null;

  @Column({ ...NEGATIVE_FLOAT_OPTIONS })
  [COLUMN_ALIASES.fromRightWeldToMaxPoint.name]: number | null;

  @Column({ ...NEGATIVE_FLOAT_OPTIONS })
  [COLUMN_ALIASES.fromRightWeldToStart.name]: number | null;

  @Column({ type: DataType.SMALLINT })
  [COLUMN_ALIASES.fromLongWeldToMaxPoint.name]: number | null;

  @Column({ type: DataType.SMALLINT })
  [COLUMN_ALIASES.fromLongWeldToCenter.name]: number | null;

  @Column({ type: DataType.SMALLINT })
  [COLUMN_ALIASES.minDistanceToLongWeld.name]: number | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS })
  [COLUMN_ALIASES.minDistanceToWeld.name]: number | null;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.fromRefPoint.name]: string | null;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.toRefPoint.name]: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  [COLUMN_ALIASES.characterType.name]: string;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.characterSort.name]: string | null;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.sizeClass.name]: string | null;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.description.name]: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  [COLUMN_ALIASES.abbreviationType.name]: string;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.abbreviationSort.name]: string | null;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.abbreviationSizeClass.name]: string | null;

  @Column({ ...HOUR_OPTIONS })
  [COLUMN_ALIASES.maxOrientation.name]: string | null;

  @Column({ ...HOUR_OPTIONS })
  [COLUMN_ALIASES.centerOrientation.name]: string | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS })
  [COLUMN_ALIASES.length.name]: number | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS })
  [COLUMN_ALIASES.width.name]: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.depth.name]: number | null;

  @Column({ type: DataType.CHAR(3) })
  [COLUMN_ALIASES.position.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.outsideInspectionTime.name]: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.PSC.name]: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.Pd.name]: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.MAOP.name]: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.Psw.name]: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.Pf.name]: number | null;

  @Column(COLUMN_ALIASES.danger.options)
  [COLUMN_ALIASES.danger.name]: StringOrNullPrimitive;
}
