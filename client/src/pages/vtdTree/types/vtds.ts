import { TimestampsField } from 'shared/types/server';

export type Vtd = {
  id: string;
  type: string;
  pipeline: string;
  section: string;
  year: string;
} & TimestampsField;

export type Vtds = Vtd[];
