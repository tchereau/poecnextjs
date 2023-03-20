import Client from '../ERP/Client/Clients';
import Bdd from '../bdd/bdd';

export default class ClientQuery {

  //Get all clients
  async getAllClients() {
    let conn;
    let rows
    const bdd = new Bdd();
    try{
      conn = await bdd.pool.getConnection().then(async conn => {return conn;})
    }catch(e){
      console.log(e);
      return false;
    }
      rows = await conn.query("SELECT * FROM clients");

      return rows;
  }

  static async getClientById(id) {
    let conn;
    try {
      conn = await Bdd.pool.getConnection();
      const rows = await conn.query("SELECT * FROM client WHERE id = ?", [id]);
      // for all rows create a new client object
      let client = new Client(rows[0].id, rows[0].name, rows[0].address, rows[0].phone, rows[0].email, rows[0].contact);
      return client;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

  //Add a client
  static async addClient(client) {
    let conn;
    try {
      conn = await Bdd.pool.getConnection();
      const result = await conn.query("INSERT INTO client (name, address, phone, email, contact) VALUES (?, ?, ?, ?, ?)", [client.name, client.address, client.phone, client.email, client.contact]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

  //Update a client

  static async updateClient(client) {
    let conn;
    try {
      conn = await Bdd.pool.getConnection();
      const result = await conn.query("UPDATE client SET name = ?, address = ?, phone = ?, email = ?, contact = ? WHERE id = ?", [client.name, client.address, client.phone, client.email, client.contact, client.id]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

  //Delete a client

  static async deleteClient(id) {
    let conn;
    try {
      conn = await Bdd.pool.getConnection();
      const result = await conn.query("DELETE FROM client WHERE id = ?", [id]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }



}