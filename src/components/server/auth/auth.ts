import Bdd from '../bdd/bdd.js';
import jwt from 'jsonwebtoken'
import { use } from 'react';



export default class Auth{

  async generateToken(user: String) {
    console.log(user)
    const token = jwt.sign({ user: user, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, process.env.JWT_SECRET)
    return token;
  }
  
  async VerifLogin(username: String, password: String) {
    const bdd = new Bdd();
    let conn;
    try{
      conn = await bdd.pool.getConnection().then(async conn => {return conn;})
      //console.log(conn)
    }catch(e){
      console.log(e);
      return false;
    }

    let rows;
    try{
      rows = await conn.query("SELECT identifiant FROM users WHERE identifiant = ? AND motdepasse = ?",[username, password]);
    }catch(e){
      console.log(e);

      return false;
    }

    if (rows.length > 0) {
      const user = {
        username: rows[0].identifiant,
      };
      return true
    } else {
      return false;
    }
  }

  async Login(username: String, password: String) {

    let user = await this.VerifLogin(username, password);
    if(user === false){
      return false;
    }
    // generate token
    //let token = jwt.sign({ user: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    let token = await this.generateToken(username);

    // save token in db
    const bdd = new Bdd();
    const conn = await bdd.pool.getConnection().then(async conn => {return conn;})


    try{
      await conn.query("UPDATE users SET token = ? WHERE identifiant = ?", [token, username]);
    }catch(e){
      console.log(e);
      return false;
    }
    return token;
  }

}