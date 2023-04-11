import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetPipelineTableDto } from './dto/getPipelineTable.dto';
import { LoadPipelineTableDto } from './dto/loadPipelineTable.dto';
import { Vtd } from './models/vtd.model';
import { PipelineTable, PipelineTables } from './types/pipelineTables';

@Injectable()
export class VtdService {
  constructor(@InjectModel(Vtd) private readonly vtdModel: typeof Vtd) {}

  getVtds(): Promise<Vtd[]> {
    const { type, pipeline, section, year, pipelineTables } = this.vtdModel.getAttributes();

    return this.vtdModel.findAll({
      attributes: { exclude: [pipelineTables.field!] },
      order: [
        [type.field!, 'DESC'],
        [pipeline.field!, 'ASC'],
        [section.field!, 'ASC'],
        [year.field!, 'DESC'],
      ],
    });
  }

  async getPipelineTable({ vtdId, type }: GetPipelineTableDto): Promise<PipelineTable> {
    const vtd = await this.vtdModel.findByPk(vtdId);

    if (!vtd) throw new NotFoundException('Vtd was not found');

    return vtd.pipelineTables.find((pipelineTable) => pipelineTable.type === type);
  }

  async loadPipelineTable({ pipelineTable }: LoadPipelineTableDto): Promise<PipelineTables> {
    const vtd = await this.vtdModel.findByPk(pipelineTable.vtdId);

    if (!vtd) throw new NotFoundException('Vtd was not found');

    const currentPipelineTable = vtd.pipelineTables.find(({ type }) => pipelineTable.type === type);

    if (currentPipelineTable) throw new BadRequestException('Vtd table already exists');

    await vtd.update({ pipelineTables: [...vtd.pipelineTables, pipelineTable] });

    return vtd.pipelineTables;
  }
}
