import mariadb from 'mariadb';

//Class to connect to the database
export default class Bdd {

  DB_HOST;
  DB_USER;
  DB_PASSWORD;
  DB_NAME;
  DB_PORT;
  

  constructor() {
    this.DB_HOST = process.env.DB_HOST;
    this.DB_USER = process.env.DB_USER;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
    this.DB_NAME = process.env.DB_NAME;
    this.DB_PORT = process.env.DB_PORT;
  }

  //Function to connect to the database

  async connect() {
    const pool = mariadb.createPool({
      host: this.DB_HOST,
      user: this.DB_USER,
      password: this.DB_PASSWORD,
      database: this.DB_NAME,
      port: this.DB_PORT,
      connectionLimit: 5
    });

    return pool;
  }
}
