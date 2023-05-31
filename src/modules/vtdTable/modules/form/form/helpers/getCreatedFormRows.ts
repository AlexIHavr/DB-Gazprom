import { COLUMN_ALIASES } from 'src/modules/vtdTable/consts/modelColumnAliases';
import { ServerError } from 'src/common/errors/serverError.error';
import { CreationAttributes } from 'src/common/types/utility';
import { ANOMALY_CELL_VALUE, WELD_CELL_VALUE } from 'src/modules/vtdTable/consts/cellValue';

import { Form } from '../models/form.model';
import { GetCreatedFormRowsParams } from '../types/params';

export const getCreatedFormRows = async ({
  vtdId,
  startKm,
  formModel,
  anomalyModel,
  characterModel,
  weldModel,
}: GetCreatedFormRowsParams) => {
  const characters = await characterModel.findAll({ where: { vtdId }, order: [[COLUMN_ALIASES.number.name, 'ASC']] });
  const anomalies = await anomalyModel.findAll({ where: { vtdId }, order: [[COLUMN_ALIASES.number.name, 'ASC']] });
  const welds = await weldModel.findAll({ where: { vtdId }, order: [[COLUMN_ALIASES.number.name, 'ASC']] });

  //check empty models
  if (!characters.length) throw ServerError.NoDataInVtdTable(characterModel.tableName);
  if (!anomalies.length) throw ServerError.NoDataInVtdTable(anomalyModel.tableName);
  if (!welds.length) throw ServerError.NoDataInVtdTable(weldModel.tableName);

  //check count anomalies in characters
  const anomaliesInCharacter = await characterModel.findAll({ where: { vtdId, characterType: ANOMALY_CELL_VALUE } });
  if (anomalies.length !== anomaliesInCharacter.length) {
    throw ServerError.InvalidCountVtdData(anomalyModel.tableName, characterModel.tableName);
  }

  //check count welds in characters
  const weldsInCharacter = await characterModel.findAll({ where: { vtdId, characterType: WELD_CELL_VALUE } });
  if (welds.length !== weldsInCharacter.length) {
    throw ServerError.InvalidCountVtdData(weldModel.tableName, characterModel.tableName);
  }

  let anomalyIndex = 0;
  let weldIndex = 0;

  const createdFormRows: Form[] = [];
  let numberIncrement = 0;

  for (const character of characters) {
    const formData: CreationAttributes<Form> = {
      ...character.dataValues,
      km: +startKm + character.distance / 1000,
      number: ++numberIncrement,
    };

    //fill anomaly
    if (formData.characterType === ANOMALY_CELL_VALUE) {
      const anomaly = anomalies[anomalyIndex];

      if (!formData.SSID && anomaly.SSID) formData.SSID = anomaly.SSID;

      formData.fromLongWeldToStart = anomaly.fromLongWeldToStart;
      formData.startOrientation = anomaly.startOrientation;
      formData.tubeComment = anomaly.tubeComment;

      anomalyIndex++;
    }

    //fill weld
    if (formData.tubeNumber !== welds[weldIndex].tubeNumber) weldIndex++;

    const weld = welds[weldIndex];
    formData.anomaliesCount = weld.anomaliesCount;
    formData.plotCategory = weld.plotCategory;
    formData.SMYS = weld.SMYS;
    formData.SMTS = weld.SMTS;
    formData.materialReliability = weld.materialReliability;
    formData.steelMark = weld.steelMark;

    try {
      const createdRows = await formModel.create(formData);
      createdFormRows.push(createdRows);
    } catch (error) {
      formModel.destroy({ where: { vtdId } });
      throw error;
    }
  }

  return createdFormRows;
};
