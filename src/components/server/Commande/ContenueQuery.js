import Contenue from "../ERP/commandes/contenueCommande";
import Bdd from "../bdd/bdd";

export default class ContenueQuery {
  //Get all clients
  async getAllContenuCommandes() {
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
    rows = await conn.query("SELECT * FROM ContenuCommande");

    return rows;
  }

  async getContenueById(id) {
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
    rows = await conn.query("SELECT * FROM commandes WHERE idCommande = ?", [
      id,
    ]);
    // for all rows create a new client object

    let collection = [];

    rows.forEach((element) => {
      let contenue = new Contenue(
        element.idCommande,
        element.idProduit,
        element.Qte
      );
      collection.push(contenue);
    });
    console.log(collection);
    return collection;
  }

  //Add a client
  async addContenue(contenue) {
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
      "INSERT INTO commandes (idCommande, idProduit, Qte) VALUES (?, ?, ?)",
      [contenue.idCommande, contenue.idProduit, contenue.Qte]
    );
    return result;
  }

  //Update a client

  async updateCommande(commande) {
    console.log(
      `UPDATE commandes SET NumeroCommandes = "${commande.NumeroCommandes}", Client = "${commande.Client}", Date = "${commande.Date}" WHERE idClient = "${commande.idCommande}";`
    );
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
      `UPDATE commandes SET NumeroCommandes = "${commande.NumeroCommandes}", Client = "${commande.Client}", Date = "${commande.Date}" WHERE idCommande = "${commande.idCommande}";`
    );
    return result;
  }

  //Delete a client

  async deleteCommande(id) {
    const bdd = new Bdd();
    let conn;
    try {
      conn = await bdd.pool.getConnection();
      const result = await conn.query(
        "DELETE FROM commandes WHERE idCommande = ?",
        [id]
      );
      return result;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }
}
