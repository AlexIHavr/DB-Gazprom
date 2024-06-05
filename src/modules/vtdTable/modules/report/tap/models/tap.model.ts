import { Column, DataType, Table } from 'sequelize-typescript';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { VtdTable } from '@vtdTable/models/vtdTable.model';

@Table
export class Tap extends VtdTable<Tap> {
  @Column({ type: DataType.STRING, allowNull: false })
  public [COLUMN_ALIASES.tapSection.name]: number;

  @Column(COLUMN_ALIASES.distance.options)
  public [COLUMN_ALIASES.distance.name]: number;

  @Column(COLUMN_ALIASES.equipmentLength.options)
  public [COLUMN_ALIASES.equipmentLength.name]: number | null;

  @Column(COLUMN_ALIASES.tubeNumber.options)
  public [COLUMN_ALIASES.tubeNumber.name]: string;

  @Column(COLUMN_ALIASES.Pd.options)
  public [COLUMN_ALIASES.Pd.name]: number | null;

  @Column(COLUMN_ALIASES.MAOP.options)
  public [COLUMN_ALIASES.MAOP.name]: number | null;

  @Column(COLUMN_ALIASES.Pf.options)
  public [COLUMN_ALIASES.Pf.name]: number | null;

  @Column(COLUMN_ALIASES.Psw.options)
  public [COLUMN_ALIASES.Psw.name]: number | null;

  @Column(COLUMN_ALIASES.PSC.options)
  public [COLUMN_ALIASES.PSC.name]: number | null;

  @Column(COLUMN_ALIASES.outsideInspectionTime.options)
  public [COLUMN_ALIASES.outsideInspectionTime.name]: number | null;

  @Column(COLUMN_ALIASES.danger.options)
  public [COLUMN_ALIASES.danger.name]: string | null;
}
