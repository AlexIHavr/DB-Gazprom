import { CreateAllDto } from '@vtdTable/dto/createAll.dto';

import { VtdTableModel } from './vtdTable.type';

export type CreateVtdTableRowsParams = CreateAllDto & { vtdTableModel: VtdTableModel };
