import { InjectModel } from '@nestjs/sequelize';
import { Vtd } from 'src/modules/vtd/models/vtd.model';
import { ServerError } from 'src/common/errors/serverError.error';
import { VtdIdDto } from 'src/common/dto/vtdId.dto';

import { VtdTable } from './models/VtdTable.model';
import { CreateAllDto } from './dto/createAll.dto';
import { VtdTableModel } from './types/vtdTable';
import { getAliasRows } from './helpers/alias';
import { getCreatedVtdTableRows } from './consts/getCreatedVtdTableRows';
import { COLUMN_ALIASES } from './consts/modelColumnAliases';

export class VtdTableService {
  @InjectModel(Vtd)
  readonly vtdModel: typeof Vtd;

  readonly vtdTableModel: VtdTableModel;
  constructor(readonly initVtdTableModel: typeof VtdTable<object>) {
    this.vtdTableModel = initVtdTableModel as VtdTableModel;
  }

  async getAllByVtdId({ vtdId }: VtdIdDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const rows = await this.vtdTableModel.findAll({ where: { vtdId }, order: [[COLUMN_ALIASES.number.name, 'ASC']] });
    return getAliasRows(rows);
  }

  async createAll({ vtdId, vtdTable }: CreateAllDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const createdRows = await getCreatedVtdTableRows({ vtdId, vtdTable, vtdTableModel: this.vtdTableModel });

    return createdRows;
  }

  async deleteAllByVtdId({ vtdId }: VtdIdDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const deletedFirstRow = await this.vtdTableModel.findOne({ where: { vtdId } });
    if (!deletedFirstRow) throw ServerError.NoDataInVtdTable(this.vtdTableModel.tableName);

    return await this.vtdTableModel.destroy({ where: { vtdId } });
  }
}
