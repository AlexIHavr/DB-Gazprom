import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/modules/vtdTable/consts/modelColumnAliases';
import { VtdTable } from 'src/modules/vtdTable/models/VtdTable.model';

@Table
export class Tap extends VtdTable<Tap> {
  @Column({ type: DataType.STRING, allowNull: false })
  [COLUMN_ALIASES.tapSection.name]: number;

  @Column(COLUMN_ALIASES.distance.options)
  [COLUMN_ALIASES.distance.name]: number;

  @Column(COLUMN_ALIASES.equipmentLength.options)
  [COLUMN_ALIASES.equipmentLength.name]: number | null;

  @Column(COLUMN_ALIASES.tubeNumber.options)
  [COLUMN_ALIASES.tubeNumber.name]: string;

  @Column(COLUMN_ALIASES.Pd.options)
  [COLUMN_ALIASES.Pd.name]: number | null;

  @Column(COLUMN_ALIASES.MAOP.options)
  [COLUMN_ALIASES.MAOP.name]: number | null;

  @Column(COLUMN_ALIASES.Pf.options)
  [COLUMN_ALIASES.Pf.name]: number | null;

  @Column(COLUMN_ALIASES.Psw.options)
  [COLUMN_ALIASES.Psw.name]: number | null;

  @Column(COLUMN_ALIASES.PSC.options)
  [COLUMN_ALIASES.PSC.name]: number | null;

  @Column(COLUMN_ALIASES.outsideInspectionTime.options)
  [COLUMN_ALIASES.outsideInspectionTime.name]: number | null;

  @Column(COLUMN_ALIASES.danger.options)
  [COLUMN_ALIASES.danger.name]: string | null;
}
