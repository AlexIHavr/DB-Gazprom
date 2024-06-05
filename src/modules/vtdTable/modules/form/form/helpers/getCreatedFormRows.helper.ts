import { COLUMN_ALIASES } from '@vtdTable/consts/modelColumnAliases.const';
import { ServerError } from 'common/errors/serverError.error';
import { CreationAttributes } from 'common/types/utility.type';
import { ANOMALY_CELL_VALUE, WELD_CELL_VALUE } from '@vtdTable/consts/cellValue.const';
import { Form } from '@vtdTable/modules/form/form/models/form.model';
import { GetCreatedFormRowsParams } from '@vtdTable/modules/form/form/types/params.type';

export const getCreatedFormRows = async ({
  vtdId,
  startKm,
  formModel,
  anomalyModel,
  characterModel,
  weldModel,
}: GetCreatedFormRowsParams): Promise<Form[]> => {
  const characters = await characterModel.findAll({
    where: { vtdId },
    order: [[COLUMN_ALIASES.number.name, 'ASC']],
  });
  const anomalies = await anomalyModel.findAll({
    where: { vtdId },
    order: [[COLUMN_ALIASES.number.name, 'ASC']],
  });
  const welds = await weldModel.findAll({
    where: { vtdId },
    order: [[COLUMN_ALIASES.number.name, 'ASC']],
  });

  // check empty models
  if (!characters.length) throw ServerError.NoDataInVtdTable(characterModel.tableName);
  if (!anomalies.length) throw ServerError.NoDataInVtdTable(anomalyModel.tableName);
  if (!welds.length) throw ServerError.NoDataInVtdTable(weldModel.tableName);

  // check count anomalies in characters
  const anomaliesInCharacter = await characterModel.findAll({
    where: { vtdId, characterType: ANOMALY_CELL_VALUE },
  });

  if (anomalies.length !== anomaliesInCharacter.length) {
    throw ServerError.InvalidCountVtdData(anomalyModel.tableName, characterModel.tableName);
  }

  // check count welds in characters
  const weldsInCharacter = await characterModel.findAll({
    where: { vtdId, characterType: WELD_CELL_VALUE },
  });

  if (welds.length !== weldsInCharacter.length) {
    throw ServerError.InvalidCountVtdData(weldModel.tableName, characterModel.tableName);
  }

  let anomalyIndex = 0;
  let weldIndex = 0;

  const createdFormRows: Promise<Form>[] = [];
  let numberIncrement = 1;

  characters.forEach((character) => {
    const formData: CreationAttributes<Form> = {
      ...character.dataValues,
      km: Number(startKm) + character.distance / 1000,
      number: numberIncrement,
    };

    numberIncrement += 1;

    // fill anomaly
    if (formData.characterType === ANOMALY_CELL_VALUE) {
      const anomaly = anomalies[anomalyIndex];

      if (!formData.SSID && anomaly.SSID) formData.SSID = anomaly.SSID;

      formData.fromLongWeldToStart = anomaly.fromLongWeldToStart;
      formData.startOrientation = anomaly.startOrientation;
      formData.tubeComment = anomaly.tubeComment;

      anomalyIndex += 1;
    }

    // fill weld
    if (formData.tubeNumber !== welds[weldIndex].tubeNumber) weldIndex += 1;

    const weld = welds[weldIndex];
    formData.anomaliesCount = weld.anomaliesCount;
    formData.plotCategory = weld.plotCategory;
    formData.SMYS = weld.SMYS;
    formData.SMTS = weld.SMTS;
    formData.materialReliability = weld.materialReliability;
    formData.steelMark = weld.steelMark;

    createdFormRows.push(formModel.create(formData));
  });

  try {
    return await Promise.all(createdFormRows);
  } catch (error) {
    formModel.destroy({ where: { vtdId } });
    throw error;
  }
};
