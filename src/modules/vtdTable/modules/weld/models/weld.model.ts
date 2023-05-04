import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import { UNSIGNED_FLOAT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { NumberPrimitive, StringOrNullPrimitive } from 'src/common/types/primitives';
import { Tube } from 'src/modules/vtdTable/models/tube.model';

@Table
export class Weld extends Tube<Weld> {
  @Column(COLUMN_ALIASES.anomaliesCount.options)
  [COLUMN_ALIASES.anomaliesCount.name]: NumberPrimitive;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.SMYS.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.SMTS.name]: number;

  @Column({ type: DataType.STRING, allowNull: false })
  [COLUMN_ALIASES.plotCategory.name]: string;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.constructionalFactor.name]: number | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.materialReliability.name]: number;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.isolationType.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.square.name]: number | null;

  @Column(COLUMN_ALIASES.weldType.options)
  [COLUMN_ALIASES.weldType.name]: StringOrNullPrimitive;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.steelMark.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.temperatureDifference.name]: number | null;
}
