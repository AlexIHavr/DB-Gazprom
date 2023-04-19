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

  async createAll({ vtdId, anomalies }: CreateAllDto) {
    const vtd = await this.vtdModel.findByPk(vtdId);

    if (!vtd) throw ServerError.NotFoundVtd();

    const createdAnomalies: Anomalies = [];
    const modelAttributes = this.anomalyModel.getAttributes();

    for (const anomaly of anomalies) {
      for (const attribute in anomaly) {
        if (modelAttributes[attribute] === undefined) throw ServerError.NotFoundColumn(attribute);
      }

      const createdAnomaly = await this.anomalyModel.create({ ...anomaly, vtdId });
      createdAnomalies.push(createdAnomaly);
    }

    return createdAnomalies;
  }
}
