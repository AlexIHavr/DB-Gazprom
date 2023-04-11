import { DataType, Column, Model, Table } from 'sequelize-typescript';
import { vtdModelCreationAttributes } from '../types/creationAttributes';
import { PipelineTables } from '../types/pipelineTables';

@Table({ tableName: 'Vtds' })
export class Vtd extends Model<Vtd, vtdModelCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
    validate: { isUUID: { args: 4, msg: 'Id must be UUID type.' } },
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  pipeline: string;

  @Column({ type: DataType.STRING, allowNull: false })
  section: string;

  @Column({ type: DataType.STRING, allowNull: false })
  year: string;

  @Column({ type: DataType.JSON, defaultValue: [], allowNull: false })
  pipelineTables: PipelineTables;
}
