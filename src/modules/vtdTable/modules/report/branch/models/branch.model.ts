import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/modules/vtdTable/consts/modelColumnAliases';
import { UNSIGNED_FLOAT_OPTIONS, UNSIGNED_SMALLINT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { Coordinate } from 'src/modules/vtdTable/models/coordinate.model';

@Table
export class Branch extends Coordinate<Branch> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.startOdometer.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.endOdometer.name]: number;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.segmentsCount.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.bendRadius.name]: number;

  @Column({ ...UNSIGNED_SMALLINT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.bendAngle.name]: number;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.angleInProjection.name]: string | null;

  @Column(COLUMN_ALIASES.type.options)
  [COLUMN_ALIASES.type.name]: string;

  @Column({ type: DataType.STRING, allowNull: false })
  [COLUMN_ALIASES.direction.name]: string;

  @Column(COLUMN_ALIASES.anomaliesCount.options)
  [COLUMN_ALIASES.anomaliesCount.name]: number;

  @Column(COLUMN_ALIASES.danger.options)
  [COLUMN_ALIASES.danger.name]: string | null;
}