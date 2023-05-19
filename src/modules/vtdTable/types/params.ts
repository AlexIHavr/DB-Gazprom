import { CreateAllDto } from '../dto/createAll.dto';

import { VtdTableModel } from './vtdTable';

export type CreateVtdTableRowsParams = CreateAllDto & { vtdTableModel: VtdTableModel };
