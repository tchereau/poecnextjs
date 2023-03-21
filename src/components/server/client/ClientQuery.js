import Client from "../ERP/Client/Clients";
import Bdd from "../bdd/bdd";

export default class ClientQuery {
  //Get all clients
  async getAllClients() {
    let conn;
    let rows;
    const bdd = new Bdd();
    try {
      conn = await bdd.pool.getConnection().then(async (conn) => {
        return conn;
      });
    } catch (e) {
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
      let client = new Client(
        rows[0].id,
        rows[0].name,
        rows[0].address,
        rows[0].phone,
        rows[0].email,
        rows[0].contact
      );
      return client;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

  //Add a client
  async addClient(client) {
    let conn;
    const bdd = new Bdd();
    try {
      conn = await bdd.pool.getConnection().then(async (conn) => {
        return conn;
      });
    } catch (e) {
      console.log(e);
      return false;
    }
    const result = await conn.query(
      "INSERT INTO clients (idClient, Siret, NomSociete, NumVoie, Voie, CodePostal, Ville, Dirigeant, Telephone) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?)",
      [
        client.id,
        client.Siret,
        client.NomSociete,
        client.NumVoie,
        client.NomVoie,
        client.CodePostal,
        client.Ville,
        client.Dirigeant,
        client.Telephone,
      ]
    );
    return result;
  }

  //Update a client

  async updateClient(client) {
    console.log(`UPDATE clients SET Siret = "${client.Siret}", NomSociete = "${client.NomSociete}", NumVoie = "${client.NumVoie}", Voie = "${client.NomVoie}", CodePostal = "${client.CodePostal}", Ville = "${client.Ville}", Dirigeant = "${client.Dirigeant}", Telephone ="${client.Telephone}" WHERE idClient = "${client.id}";`);
    let conn;
    const bdd = new Bdd();
    try {
      conn = await bdd.pool.getConnection().then(async (conn) => {
        return conn;
      });
    } catch (e) {
      console.log(e);
      return false;
    }
    const result = await conn.query(`UPDATE clients SET Siret = "${client.Siret}", NomSociete = "${client.NomSociete}", NumVoie = "${client.NumVoie}", Voie = "${client.NomVoie}", CodePostal = "${client.CodePostal}", Ville = "${client.Ville}", Dirigeant = "${client.Dirigeant}", Telephone ="${client.Telephone}" WHERE idClient = "${client.id}";`);
    return result;
  }

  //Delete a client

 async deleteClient(id) {
    const bdd = new Bdd();
    let conn;
    try {
      conn = await bdd.pool.getConnection();
      const result = await conn.query("DELETE FROM clients WHERE idClient = ?", [id]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }
}
