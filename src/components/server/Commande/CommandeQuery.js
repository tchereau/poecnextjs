import Commande from "../ERP/commandes/commandes";
import Bdd from "../bdd/bdd";

export default class CommandeQuery {
  //Get all clients
  async getAllCommandes() {
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
    rows = await conn.query("SELECT * FROM commandes");

    return rows;
  }

  static async getCommandeById(id) {
    let conn;
    try {
      conn = await Bdd.pool.getConnection();
      const rows = await conn.query("SELECT * FROM commandes WHERE id = ?", [id]);
      // for all rows create a new client object
      let commande = new Commande(
        rows[0].idCommande,
        rows[0].NumeroCommandes,
        rows[0].Client,
        rows[0].Date
      );
      return commande;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

  //Add a client
  async addCommande(commande) {
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
      "INSERT INTO commandes (idCommande, NumeroCommandes, Client, Date) VALUES (?, ?, ?, ?)",
      [
        commande.idCommande,
        commande.NumeroCommandes,
        commande.Client,
        commande.Date
      ]
    );
    return result;
  }

  //Update a client

  async updateCommande(commande) {
    console.log(`UPDATE commandes SET NumeroCommandes = "${commande.NumeroCommandes}", Client = "${commande.Client}", Date = "${commande.Date}" WHERE idClient = "${commande.idCommande}";`);
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
    const result = await conn.query(`UPDATE commandes SET NumeroCommandes = "${commande.NumeroCommandes}", Client = "${commande.Client}", Date = "${commande.Date}" WHERE idCommande = "${commande.idCommande}";`);
    return result;
  }

  //Delete a client

  async deleteCommande(id) {
    const bdd = new Bdd();
    let conn;
    try {
      conn = await bdd.pool.getConnection();
      const result = await conn.query("DELETE FROM commandes WHERE idCommande = ?", [id]);
      return result;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }
}
