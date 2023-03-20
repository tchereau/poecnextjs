import Bdd from '../bdd/bdd.js';
import jwt from 'jsonwebtoken'


export default class Verif{

  async verifyToken(token) {
    let tokenAuth;
    console.log(1)
    try{
      tokenAuth = jwt.verify(token, process.env.JWT_SECRET);
      console.log(2)
    }catch (error) {
      console.log(3)
      return {code: "401", error: "Invalid token"}
    }
    if(tokenAuth?.exp > Date.now()){
      return {code: "401", error: "Token expired"}
    }
    if(tokenAuth.user == null){
      console.log(4)
      return {code: "401", error: "Invalid user"}
    }
    //verifier si l'utilisateur existe
    const bdd = new Bdd();
    let conn;
    try{
      conn = await bdd.pool.getConnection().then(async conn => {return conn;})
    }catch(e){
      console.log(e);
      return {code: "500", error: "Internal server error"}
    }
    let rows;
    try{
      rows = await conn.query("SELECT * FROM users WHERE identifiant = ?", [tokenAuth.user]);
    }catch(e){
      console.log(e);
      return {code: "500", error: "Internal server error"}
    }
    if(rows.length == 0){
      return {code: "401", error: "Invalid user"}
    }
    try{
      rows = await conn.query("SELECT * FROM users WHERE identifiant = ? AND token = ?", [tokenAuth.user, token]);
    }catch(e){
      console.log(e);
      return {code: "500", error: "Internal server error"}
    }
    if(rows.length == 0){
      return {code: "401", error: "Invalid token for this user"}
    }
    return true

  }
}