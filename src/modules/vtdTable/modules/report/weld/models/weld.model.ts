import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/modules/vtdTable/consts/modelColumnAliases';
import { UNSIGNED_FLOAT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { Tube } from 'src/modules/vtdTable/models/tube.model';

@Table
export class Weld extends Tube<Weld> {
  @Column(COLUMN_ALIASES.anomaliesCount.options)
  [COLUMN_ALIASES.anomaliesCount.name]: number;

  @Column(COLUMN_ALIASES.SMYS.options)
  [COLUMN_ALIASES.SMYS.name]: number;

  @Column(COLUMN_ALIASES.SMTS.options)
  [COLUMN_ALIASES.SMTS.name]: number;

  @Column(COLUMN_ALIASES.plotCategory.options)
  [COLUMN_ALIASES.plotCategory.name]: string;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.constructionalFactor.name]: number | null;

  @Column(COLUMN_ALIASES.materialReliability.options)
  [COLUMN_ALIASES.materialReliability.name]: number;

  @Column({ type: DataType.STRING })
  [COLUMN_ALIASES.isolationType.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.square.name]: number | null;

  @Column(COLUMN_ALIASES.weldType.options)
  [COLUMN_ALIASES.weldType.name]: string | null;

  @Column(COLUMN_ALIASES.steelMark.options)
  [COLUMN_ALIASES.steelMark.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  [COLUMN_ALIASES.temperatureDifference.name]: number | null;
}