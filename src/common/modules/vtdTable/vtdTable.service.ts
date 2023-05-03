import { InjectModel } from '@nestjs/sequelize';
import { VtdTable } from 'src/common/models/VtdTable.model';
import { Vtd } from 'src/modules/vtd/models/vtd.model';
import { ServerError } from 'src/common/errors/serverError.error';

import { GetAllByVtdIdDto } from './dto/getAllByVtdId.dto';
import { CreateAllDto } from './dto/createAll.dto';
import { VtdTableModel, VtdTableRows } from './types/vtdTable';

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

    console.log(rows.length);

    return rows;
  }

  async createAll({ vtdId, vtdTable }: CreateAllDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const firstRow = await this.vtdTableModel.findOne({ where: { vtdId } });
    if (firstRow) throw ServerError.ExistsVtdTable(this.vtdTableModel.tableName);

    const createdRows: VtdTableRows = [];
    const modelAttributes = this.vtdTableModel.getAttributes();

    for (const row of vtdTable) {
      for (const attribute in row) {
        if (modelAttributes[attribute] === undefined) throw ServerError.NotFoundColumn(attribute);
      }

      let createdRow: VtdTable;

      try {
        createdRow = await this.vtdTableModel.create({ ...row, vtdId });
      } catch (error) {
        this.vtdTableModel.destroy({ where: { vtdId } });
        throw error;
      }

      createdRows.push(createdRow);
    }

    return createdRows;
  }
}
