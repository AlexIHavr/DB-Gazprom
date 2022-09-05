import { Sequelize, Dialect } from 'sequelize';

class SequelizeRepository {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = this._initDB();
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      console.log(`Connection to DB has been established successfully.`);
    } catch (err) {
      console.error(err);
    }
  }

  _initDB() {
    const { DB_NAME, USER_NAME, PASSWORD, HOST, DB_TYPE } = process.env;

    return new Sequelize(String(DB_NAME), String(USER_NAME), String(PASSWORD), {
      host: HOST,
      dialect: DB_TYPE as Dialect,
    });
  }
}

export default new SequelizeRepository();
