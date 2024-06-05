import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import {
  UNSIGNED_FLOAT_OPTIONS,
  UNSIGNED_SMALLINT_OPTIONS,
} from 'common/consts/modelColumnOptions.const';
import { Coordinate } from '@vtdTable/models/coordinate.model';

@Table
export class Branch extends Coordinate<Branch> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  public [COLUMN_ALIASES.startOdometer.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  public [COLUMN_ALIASES.endOdometer.name]: number;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, allowNull: false })
  public [COLUMN_ALIASES.segmentsCount.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  public [COLUMN_ALIASES.bendRadius.name]: number;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, allowNull: false })
  public [COLUMN_ALIASES.bendAngle.name]: number;

  @Column({ type: DataType.STRING })
  public [COLUMN_ALIASES.angleInProjection.name]: string | null;

  @Column(COLUMN_ALIASES.type.options)
  public [COLUMN_ALIASES.type.name]: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public [COLUMN_ALIASES.direction.name]: string;

  @Column(COLUMN_ALIASES.anomaliesCount.options)
  public [COLUMN_ALIASES.anomaliesCount.name]: number;

  @Column(COLUMN_ALIASES.danger.options)
  public [COLUMN_ALIASES.danger.name]: string | null;
}
