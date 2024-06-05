import { Column, DataType } from 'sequelize-typescript';
import {
  HOUR_OPTIONS,
  NEGATIVE_FLOAT_OPTIONS,
  UNSIGNED_FLOAT_OPTIONS,
  UNSIGNED_SMALLINT_OPTIONS,
} from 'common/consts/modelColumnOptions.const';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';

import { Tube } from './tube.model';

export class Defect<TModelAttributes extends object> extends Tube<TModelAttributes> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  public [COLUMN_ALIASES.fromLeftWeldToMaxPoint.name]: number | null;

  @Column({ type: DataType.FLOAT })
  public [COLUMN_ALIASES.fromLeftWeldToStart.name]: number | null;

  @Column({ ...NEGATIVE_FLOAT_OPTIONS })
  public [COLUMN_ALIASES.fromRightWeldToMaxPoint.name]: number | null;

  @Column({ ...NEGATIVE_FLOAT_OPTIONS })
  public [COLUMN_ALIASES.fromRightWeldToStart.name]: number | null;

  @Column({ type: DataType.SMALLINT })
  public [COLUMN_ALIASES.fromLongWeldToMaxPoint.name]: number | null;

  @Column({ type: DataType.SMALLINT })
  public [COLUMN_ALIASES.fromLongWeldToCenter.name]: number | null;

  @Column({ type: DataType.SMALLINT })
  public [COLUMN_ALIASES.minDistanceToLongWeld.name]: number | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS })
  public [COLUMN_ALIASES.minDistanceToWeld.name]: number | null;

  @Column({ type: DataType.STRING })
  public [COLUMN_ALIASES.fromRefPoint.name]: string | null;

  @Column({ type: DataType.STRING })
  public [COLUMN_ALIASES.toRefPoint.name]: string | null;

  @Column(COLUMN_ALIASES.characterType.options)
  public [COLUMN_ALIASES.characterType.name]: string;

  @Column({ type: DataType.STRING })
  public [COLUMN_ALIASES.characterSort.name]: string | null;

  @Column({ type: DataType.STRING })
  public [COLUMN_ALIASES.sizeClass.name]: string | null;

  @Column(COLUMN_ALIASES.description.options)
  public [COLUMN_ALIASES.description.name]: string | null;

  @Column(COLUMN_ALIASES.abbreviationType.options)
  public [COLUMN_ALIASES.abbreviationType.name]: string;

  @Column({ type: DataType.STRING })
  public [COLUMN_ALIASES.abbreviationSort.name]: string | null;

  @Column({ type: DataType.STRING })
  public [COLUMN_ALIASES.abbreviationSizeClass.name]: string | null;

  @Column({ ...HOUR_OPTIONS })
  public [COLUMN_ALIASES.maxOrientation.name]: string | null;

  @Column({ ...HOUR_OPTIONS })
  public [COLUMN_ALIASES.centerOrientation.name]: string | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS })
  public [COLUMN_ALIASES.length.name]: number | null;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS })
  public [COLUMN_ALIASES.width.name]: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  public [COLUMN_ALIASES.depth.name]: number | null;

  @Column({ type: DataType.CHAR(3) })
  public [COLUMN_ALIASES.position.name]: string | null;

  @Column(COLUMN_ALIASES.outsideInspectionTime.options)
  public [COLUMN_ALIASES.outsideInspectionTime.name]: number | null;

  @Column(COLUMN_ALIASES.PSC.options)
  public [COLUMN_ALIASES.PSC.name]: number | null;

  @Column(COLUMN_ALIASES.Pd.options)
  public [COLUMN_ALIASES.Pd.name]: number | null;

  @Column(COLUMN_ALIASES.MAOP.options)
  public [COLUMN_ALIASES.MAOP.name]: number | null;

  @Column(COLUMN_ALIASES.Psw.options)
  public [COLUMN_ALIASES.Psw.name]: number | null;

  @Column(COLUMN_ALIASES.Pf.options)
  public [COLUMN_ALIASES.Pf.name]: number | null;

  @Column(COLUMN_ALIASES.danger.options)
  public [COLUMN_ALIASES.danger.name]: string | null;
}
