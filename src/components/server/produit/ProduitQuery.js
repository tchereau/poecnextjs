import Produits from "../ERP/Produits/Produits";
import Bdd from "../bdd/bdd";

export default class ProduitQuery {
  //Get all clients
  async getAllProduit() {
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
    rows = await conn.query("SELECT * FROM produits");
    bdd.pool.end();
    return rows;
  }

  static async getProduitById(id) {
    let conn;
    try {
      conn = await Bdd.pool.getConnection();
      const rows = await conn.query(
        "SELECT * FROM produits WHERE idProduit = ?",
        [id]
      );
      // for all rows create a new client object
      let produit = new Produits(
        rows[0].idProduit,
        rows[0].CodeProduit,
        rows[0].Libelle,
        rows[0].Prix
      );
      return produit;
    } catch (err) {
      throw err;
    } finally {
      if (conn) return bdd.pool.end();
    }
  }

  //Add a client
  async addProduit(produit) {
    let conn;
    const bdd = new Bdd();
    try {
      conn = await bdd.pool.getConnection().then(async (conn) => {
        return conn;
      });
    } catch (e) {
      console.log(e);
      bdd.pool.end();
      return false;
    }
    const result = await conn.query(
      "INSERT INTO produits (idProduit, CodeProduit, Libelle, Prix) VALUES (?, ?, ?, ?)",
      [produit.idProduit, produit.CodeProduit, produit.Libelle, produit.Prix]
    );
    bdd.pool.end();
    return result;
  }

  //Update a client

  async updateProduit(produit) {
    console.log(
      `UPDATE produits SET CodeProduit = "${produit.CodeProduit}", Libelle = "${produit.Libelle}", Prix = "${produit.Prix}" WHERE idProduit = "${produit.idProduit}";`
    );
    let conn;
    const bdd = new Bdd();
    try {
      conn = await bdd.pool.getConnection().then(async (conn) => {
        return conn;
      });
    } catch (e) {
      console.log(e);
      bdd.pool.end();
      return false;
    }

    const result = await conn.query(
      `UPDATE produits SET CodeProduit = "${produit.CodeProduit}", Libelle = "${produit.Libelle}", Prix = "${produit.Prix}" WHERE idProduit = "${produit.idProduit}";`
    );
    bdd.pool.end();
    return result;
  }

  //Delete a client

  async deleteProduit(id) {
    const bdd = new Bdd();
    let conn;
    try {
      conn = await bdd.pool.getConnection();
      const result = await conn.query(
        "DELETE FROM produits WHERE idProduit = ?",
        [id]
      );
      return result;
    } catch (err) {
      bdd.pool.end();
      throw err;
    } finally {
      if (conn) return bdd.pool.end();
    }
  }
}
