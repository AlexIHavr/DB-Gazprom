import { DataType, Column, Model, Table } from 'sequelize-typescript';
import { ID_OPTIONS } from 'common/consts/modelColumnOptions.const';

@Table
export class Vtd extends Model<Vtd, Partial<Vtd>> {
  @Column(ID_OPTIONS)
  public declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public pipeline: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public section: string;

  @Column({ type: DataType.CHAR(4), allowNull: false })
  public year: string;
}
