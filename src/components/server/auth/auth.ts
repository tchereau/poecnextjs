import Bdd from '../bdd/bdd.js';
import jwt from 'jsonwebtoken'
import { use } from 'react';



export default class Auth{

  async generateToken(user: String) {
    console.log(user.username)
    const token = jwt.sign({ user: user.username, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, process.env.JWT_SECRET)
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
      //console.log(user)
      const token = this.generateToken(user);
      return { user, token };
    } else {
      return null;
    }
  }

  async VerifToken(token) {
    const bdd = new Bdd();

    let conn;
    try{
      conn = await bdd.pool.getConnection().then(async conn => {return conn;})
    }catch(e){
      console.log(e);
      //bdd.end();
      return false;
    }

    let coon2 = await Bdd().conn;
    let rows;
    try{
      rows = await conn.query("SELECT * FROM users WHERE token = ?", [token]);
    }catch(e){
      console.log(e);
      //bdd.end();
      return false;
    }

    if(rows.length === 0){
      return false;
    }
    return true;
  }

  async Login(username, password) {

    let user = await this.VerifLogin(username, password);
    if(user === null){
      return false;
    }
    // generate token
    //let token = jwt.sign({ user: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    let token = await this.generateToken(user.user);
    // save token in db
    const bdd = new Bdd();
    const conn = await bdd.pool.getConnection().then(async conn => {return conn;})


    try{
      await conn.query("UPDATE users SET token = ? WHERE identifiant = ?", [token, username]);
    }catch(e){
      console.log(e);
      //pool.end();
      return false;
    }

    //pool.end();
    // return token
    return token;
  }

}