import { DataType, Column, Model, Table } from 'sequelize-typescript';
import { ID_OPTIONS } from 'src/common/consts/modelColumnOptions';

@Table
export class Vtd extends Model<Vtd> {
  @Column(ID_OPTIONS)
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  pipeline: string;

  @Column({ type: DataType.STRING, allowNull: false })
  section: string;

  @Column({ type: DataType.CHAR(4), allowNull: false })
  year: string;
}
