import { Column } from 'sequelize-typescript';

import { TYPE_COLUMN, TypeColumn } from '../consts/modelColumns';

import { HOUR_OPTIONS, UNSIGNED_FLOAT_OPTIONS } from './../consts/modelColumnOptions';
import { VtdTable } from './VtdTable.model';

export class Tube<TModelAttributes extends object> extends VtdTable<TModelAttributes> {
  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'distance' })
  'Расстояние, м': number;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'tubeLength' })
  'Длина трубы, м': number;

  @Column(TYPE_COLUMN.options)
  [TYPE_COLUMN.name]: TypeColumn;

  @Column({ ...HOUR_OPTIONS, field: 'inputLongWeld' })
  'Входящий ПШ, ч:мин': string | null;

  @Column({ ...HOUR_OPTIONS, field: 'outputLongWeld' })
  'Выходящий ПШ, ч:мин': string | null;

  @Column({ ...UNSIGNED_FLOAT_OPTIONS, allowNull: false, field: 'thickness' })
  'Толщина, мм': number;
}
