import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vtd } from '../vtd/models/vtd.model';
import { GetAllByVtdIdDto } from './dto/getAllByVtdId.dto';
import { Anomaly } from './models/anomaly.model';
import { ServerError } from 'src/common/errors/serverError.error';
import { CreateAllDto } from './dto/createAll.dto';
import { Anomalies } from './types/anomalies';

@Injectable()
export class AnomalyService {
  constructor(
    @InjectModel(Anomaly) private readonly anomalyModel: typeof Anomaly,
    @InjectModel(Vtd) private readonly vtdModel: typeof Vtd,
  ) {}

  async getAllByVtdId({ vtdId }: GetAllByVtdIdDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const anomalies = await this.anomalyModel.findAll({ where: { vtdId } });

    return anomalies;
  }

  async createAll({ vtdId, vtdTable }: CreateAllDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);
    if (!vtd) throw ServerError.NotFoundVtd();

    const firstAnomaly = await this.anomalyModel.findOne({ where: { vtdId } });
    if (firstAnomaly) throw ServerError.ExistsVtdTable(this.anomalyModel.tableName);

    const createdAnomalies: Anomalies = [];
    const modelAttributes = this.anomalyModel.getAttributes();

    for (const anomaly of vtdTable) {
      for (const attribute in anomaly) {
        if (modelAttributes[attribute] === undefined) throw ServerError.NotFoundColumn(attribute);
      }

      let createdAnomaly: Anomaly;

      try {
        createdAnomaly = await this.anomalyModel.create({ ...anomaly, vtdId });
      } catch (error) {
        this.anomalyModel.destroy({ where: { vtdId } });
        throw error;
      }

      createdAnomalies.push(createdAnomaly);
    }

    return createdAnomalies;
  }
}
