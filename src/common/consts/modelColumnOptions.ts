import { ModelAttributeColumnOptions } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { hourValidation } from '../helpers/customValidations.';

export const VTD_ID_OPTIONS: ModelAttributeColumnOptions = {
  type: DataType.UUID,
  allowNull: false,
  validate: { isUUID: 4 },
};

export const ID_OPTIONS: ModelAttributeColumnOptions = {
  ...VTD_ID_OPTIONS,
  defaultValue: DataType.UUIDV4,
  primaryKey: true,
};

export const HOUR_OPTIONS: ModelAttributeColumnOptions = {
  type: DataType.STRING,
  validate: { hourValidation },
};

export const NEGATIVE_FLOAT_OPTIONS: ModelAttributeColumnOptions = {
  type: DataType.FLOAT,
  validate: { max: 0 },
};

export const UNSIGNED_FLOAT_OPTIONS: ModelAttributeColumnOptions = {
  type: DataType.FLOAT,
  validate: { min: 0 },
};

export const UNSIGNED_INTEGER_OPTIONS: ModelAttributeColumnOptions = {
  type: DataType.INTEGER,
  validate: { min: 0 },
};

export const UNSIGNED_SMALLINT_OPTIONS: ModelAttributeColumnOptions = {
  type: DataType.SMALLINT,
  validate: { min: 0 },
};
