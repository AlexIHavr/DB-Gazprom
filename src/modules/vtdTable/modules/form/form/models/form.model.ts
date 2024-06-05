import { Column, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { UNSIGNED_FLOAT_OPTIONS } from 'common/consts/modelColumnOptions.const';
import { Defect } from '@vtdTable/models/defect.model';

@Table
export class Form extends Defect<Form> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  public [COLUMN_ALIASES.km.name]: number;

  @Column(COLUMN_ALIASES.fromLongWeldToStart.options)
  public [COLUMN_ALIASES.fromLongWeldToStart.name]: number | null;

  @Column(COLUMN_ALIASES.startOrientation.options)
  public [COLUMN_ALIASES.startOrientation.name]: string | null;

  @Column(COLUMN_ALIASES.weldType.options)
  public [COLUMN_ALIASES.weldType.name]: string | null;

  @Column(COLUMN_ALIASES.tubeComment.options)
  public [COLUMN_ALIASES.tubeComment.name]: string | null;

  @Column(COLUMN_ALIASES.anomaliesCount.options)
  public [COLUMN_ALIASES.anomaliesCount.name]: number;

  @Column(COLUMN_ALIASES.plotCategory.options)
  public [COLUMN_ALIASES.plotCategory.name]: string;

  @Column(COLUMN_ALIASES.SMYS.options)
  public [COLUMN_ALIASES.SMYS.name]: number;

  @Column(COLUMN_ALIASES.SMTS.options)
  public [COLUMN_ALIASES.SMTS.name]: number;

  @Column(COLUMN_ALIASES.materialReliability.options)
  public [COLUMN_ALIASES.materialReliability.name]: number;

  @Column(COLUMN_ALIASES.steelMark.options)
  public [COLUMN_ALIASES.steelMark.name]: string | null;
}
