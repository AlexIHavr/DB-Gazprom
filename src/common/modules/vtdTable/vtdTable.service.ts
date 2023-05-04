import { InjectModel } from '@nestjs/sequelize';
import { VtdTable } from 'src/common/models/VtdTable.model';
import { Vtd } from 'src/modules/vtd/models/vtd.model';
import { ServerError } from 'src/common/errors/serverError.error';
import { COLUMN_NAMES } from 'src/common/consts/modelColumnAliases';
import { getAliasRows } from 'src/common/helpers/alias';

import { GetAllByVtdIdDto } from './dto/getAllByVtdId.dto';
import { CreateAllDto } from './dto/createAll.dto';
import { VtdTableModel, VtdTableRows } from './types/vtdTable';
import { getNameRow } from '../../helpers/alias';

export class VtdTableService {
  @InjectModel(Vtd)
  readonly vtdModel: typeof Vtd;

  readonly vtdTableModel: VtdTableModel;
  constructor(readonly initVtdTableModel: typeof VtdTable<object>) {
    this.vtdTableModel = initVtdTableModel as VtdTableModel;
  }

  async getAllByVtdId({ vtdId }: GetAllByVtdIdDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const rows = await this.vtdTableModel.findAll({ where: { vtdId } });
    return getAliasRows(rows);
  }

  async createAll({ vtdId, vtdTable }: CreateAllDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const firstRow = await this.vtdTableModel.findOne({ where: { vtdId } });
    if (firstRow) throw ServerError.ExistsVtdTable(this.vtdTableModel.tableName);

    const createdRows: VtdTableRows = [];
    const modelAttributes = this.vtdTableModel.getAttributes();

    //check vtdTable headers exist in model
    Object.keys(vtdTable[0]).forEach((alias) => {
      if (modelAttributes[COLUMN_NAMES[alias] || alias] === undefined) throw ServerError.NotFoundColumn(alias);
    });

    for (const row of vtdTable) {
      let createdRow: VtdTable;

      try {
        createdRow = await this.vtdTableModel.create({ ...getNameRow(row), vtdId });
      } catch (error) {
        this.vtdTableModel.destroy({ where: { vtdId } });
        throw error;
      }

      createdRows.push(createdRow);
    }

    return createdRows;
  }
}
