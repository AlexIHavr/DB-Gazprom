import { PipelineData } from 'widgets';

import { TABLE_TYPES } from '../consts/tableTypes';

import { LoadTableButtonProps } from './props';

export type TableType = keyof typeof TABLE_TYPES;
export type PipelineTable = LoadTableButtonProps & PipelineData;
