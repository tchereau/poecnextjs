import mariadb from "mariadb";

//Class to connect to the database
export default class Bdd {
  //conn;
  pool;

  constructor() {
    this.pool = mariadb.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      connectionLimit: 50,
    });
  }

  get pool() {
    return this.pool;
  }
}
