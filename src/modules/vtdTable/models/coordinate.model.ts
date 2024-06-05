import { Column, DataType } from 'sequelize-typescript';
import {
  UNSIGNED_FLOAT_OPTIONS,
  UNSIGNED_INTEGER_OPTIONS,
} from 'common/consts/modelColumnOptions.const';
import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';

import { VtdTable } from './vtdTable.model';

export class Coordinate<
  TModelAttributes extends object = object,
> extends VtdTable<TModelAttributes> {
  @Column({ ...UNSIGNED_INTEGER_OPTIONS, unique: true })
  public SSID: number | null;

  @Column(COLUMN_ALIASES.tubeNumber.options)
  public [COLUMN_ALIASES.tubeNumber.name]: string;

  @Column({ type: DataType.TEXT })
  public [COLUMN_ALIASES.comment.name]: string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 51, max: 55 } })
  public [COLUMN_ALIASES.latitude.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, validate: { min: 23, max: 32 } })
  public [COLUMN_ALIASES.longitude.name]: number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false })
  public [COLUMN_ALIASES.altitude.name]: number;
}
