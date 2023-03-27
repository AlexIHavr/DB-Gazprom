import { DataTypes } from 'sequelize';

import sequelizeRepository from '../repositories/sequelizeRepository';
import { VtdModel } from '../types/vtdTypes';

const vtdModel = sequelizeRepository.sequelize.define<VtdModel>('Vtd', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      isUUID: {
        args: 4,
        msg: 'Id must be UUID type.',
      },
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pipeline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pipelineData: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {},
  },
});

export default vtdModel;
