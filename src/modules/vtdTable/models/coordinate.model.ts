import { Column, DataType } from 'sequelize-typescript';
import { COLUMN_ALIASES } from 'src/common/consts/modelColumnAliases';
import { UNSIGNED_FLOAT_OPTIONS, UNSIGNED_INTEGER_OPTIONS } from 'src/common/consts/modelColumnOptions';
import { VtdTable } from './vtdTable.model';

export class Coordinate<TModelAttributes extends object = object> extends VtdTable<TModelAttributes> {
  @Column({ ...UNSIGNED_INTEGER_OPTIONS, unique: true })
  SSID: number | null;

  @Column(COLUMN_ALIASES.tubeNumber.options)
  [COLUMN_ALIASES.tubeNumber.name]: string;

  @Column({ type: DataType.TEXT })
  [COLUMN_ALIASES.comment.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 51, max: 55 } })
  [COLUMN_ALIASES.latitude.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 23, max: 32 } })
  [COLUMN_ALIASES.longitude.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  [COLUMN_ALIASES.altitude.name]: number;
}
