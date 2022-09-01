import { Dialect } from 'sequelize/types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      USER_NAME: string;
      PASSWORD: string;
      HOST: string;
      DB_TYPE: Dialect;
      PORT: number;
    }
  }
}

export {};
