import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { UNSIGNED_FLOAT_OPTIONS } from 'common/consts/modelColumnOptions.const';
import { Tube } from '@vtdTable/models/tube.model';

@Table
export class Weld extends Tube<Weld> {
  @Column(COLUMN_ALIASES.anomaliesCount.options)
  public [COLUMN_ALIASES.anomaliesCount.name]: number;

  @Column(COLUMN_ALIASES.SMYS.options)
  public [COLUMN_ALIASES.SMYS.name]: number;

  @Column(COLUMN_ALIASES.SMTS.options)
  public [COLUMN_ALIASES.SMTS.name]: number;

  @Column(COLUMN_ALIASES.plotCategory.options)
  public [COLUMN_ALIASES.plotCategory.name]: string;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  public [COLUMN_ALIASES.constructionalFactor.name]: number | null;

  @Column(COLUMN_ALIASES.materialReliability.options)
  public [COLUMN_ALIASES.materialReliability.name]: number;

  @Column({ type: DataType.STRING })
  public [COLUMN_ALIASES.isolationType.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  public [COLUMN_ALIASES.square.name]: number | null;

  @Column(COLUMN_ALIASES.weldType.options)
  public [COLUMN_ALIASES.weldType.name]: string | null;

  @Column(COLUMN_ALIASES.steelMark.options)
  public [COLUMN_ALIASES.steelMark.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS })
  public [COLUMN_ALIASES.temperatureDifference.name]: number | null;
}
