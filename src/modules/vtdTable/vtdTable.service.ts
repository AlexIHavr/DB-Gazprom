import { InjectModel } from '@nestjs/sequelize';
import { Vtd } from '@vtd/models/vtd.model';
import { ServerError } from 'common/errors/serverError.error';
import { VtdIdDto } from 'common/dto/vtdId.dto';

import { COLUMN_ALIASES } from './consts/modelColumnAliases.const';
import { VTD_ID_PREV } from './modules/form/joining/const/attributes.const';
import { VtdTable } from './models/vtdTable.model';
import { CreateAllDto } from './dto/createAll.dto';
import { VtdTableModel, VtdTableRows } from './types/vtdTable.type';
import { getAliasRows } from './helpers/alias.helper';
import { getCreatedVtdTableRows } from './consts/getCreatedVtdTableRows.const';

export class VtdTableService {
  @InjectModel(Vtd)
  protected readonly vtdModel: typeof Vtd;

  private readonly vtdTableModel: VtdTableModel;

  constructor(initVtdTableModel: typeof VtdTable<object>) {
    this.vtdTableModel = initVtdTableModel as VtdTableModel;
  }

  public async getAllByVtdId({ vtdId }: VtdIdDto): Promise<VtdTable<VtdTable<object>>[]> {
    const vtd = await this.vtdModel.findByPk(vtdId);

    if (!vtd) throw ServerError.NotFoundVtd();

    const { id, vtdId: vtdIdAttribute, createdAt, updatedAt } = this.vtdTableModel.getAttributes();
    const rows = await this.vtdTableModel.findAll({
      where: { vtdId },
      order: [[COLUMN_ALIASES.number.name, 'ASC']],
      attributes: {
        exclude: [
          id.field ?? '',
          vtdIdAttribute.field ?? '',
          createdAt?.field ?? '',
          updatedAt?.field ?? '',
          VTD_ID_PREV,
        ],
      },
    });

    return getAliasRows(rows);
  }

  public async createAll({ vtdId, vtdTable }: CreateAllDto): Promise<VtdTableRows> {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const createdRows = await getCreatedVtdTableRows({
      vtdId,
      vtdTable,
      vtdTableModel: this.vtdTableModel,
    });

    return createdRows;
  }

  public async deleteAllByVtdId({ vtdId }: VtdIdDto): Promise<number> {
    const vtd = await this.vtdModel.findByPk(vtdId);

    if (!vtd) throw ServerError.NotFoundVtd();

    const deletedFirstRow = await this.vtdTableModel.findOne({ where: { vtdId } });

    if (!deletedFirstRow) throw ServerError.NoDataInVtdTable(this.vtdTableModel.tableName);

    return this.vtdTableModel.destroy({ where: { vtdId } });
  }
}
