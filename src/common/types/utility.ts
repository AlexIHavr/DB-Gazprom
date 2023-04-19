import { InferAttributes } from 'sequelize';
import { Model } from 'sequelize-typescript';

export type CreationAttributes<M extends Model> = Partial<
  InferAttributes<M, { omit: 'createdAt' | 'updatedAt' | 'deletedAt' | 'version' }>
>;
