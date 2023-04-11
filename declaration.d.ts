import { Dialect } from 'sequelize';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      USER_NAME: string;
      PASSWORD: string;
      HOST: string;
      DB_TYPE: Dialect;
      PORT: number;
      CLIENT_URL: string;
      GLOBAL_PREFIX: string;
      MAX_REQUEST_SIZE: string;
    }
  }
}

export {};
