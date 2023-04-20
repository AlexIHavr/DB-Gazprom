import { TimestampsField } from 'shared/types/server';

export type Vtds = ({
  id: string;
  type: string;
  pipeline: string;
  section: string;
  year: string;
} & TimestampsField)[];
