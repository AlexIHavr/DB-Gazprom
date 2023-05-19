import { Column, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/modules/vtdTable/consts/modelColumnAliases';
import { UNSIGNED_FLOAT_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { Defect } from 'src/modules/vtdTable/models/defect.model';

@Table
export class Form extends Defect<Form> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.km.name]: number;

  @Column(COLUMN_ALIASES.fromLongWeldToStart.options)
  [COLUMN_ALIASES.fromLongWeldToStart.name]: number | null;

  @Column(COLUMN_ALIASES.startOrientation.options)
  [COLUMN_ALIASES.startOrientation.name]: string | null;

  @Column(COLUMN_ALIASES.weldType.options)
  [COLUMN_ALIASES.weldType.name]: string | null;

  @Column(COLUMN_ALIASES.tubeComment.options)
  [COLUMN_ALIASES.tubeComment.name]: string | null;

  @Column(COLUMN_ALIASES.anomaliesCount.options)
  [COLUMN_ALIASES.anomaliesCount.name]: number;

  @Column(COLUMN_ALIASES.plotCategory.options)
  [COLUMN_ALIASES.plotCategory.name]: string;

  @Column(COLUMN_ALIASES.SMYS.options)
  [COLUMN_ALIASES.SMYS.name]: number;

  @Column(COLUMN_ALIASES.SMTS.options)
  [COLUMN_ALIASES.SMTS.name]: number;

  @Column(COLUMN_ALIASES.materialReliability.options)
  [COLUMN_ALIASES.materialReliability.name]: number;

  @Column(COLUMN_ALIASES.steelMark.options)
  [COLUMN_ALIASES.steelMark.name]: string | null;
}
