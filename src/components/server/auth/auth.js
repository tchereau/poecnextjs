import Bdd from '../bdd/bdd.js';
import jwt from 'jsonwebtoken'



export default class Auth{

  async VerifLogin(username, password) {
    const bdd = new Bdd();
    const pool = await bdd.connect();

    const rows = await pool.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

    bdd.end();

    if(rows.length === 0){
      return false;
    }
    return true;
  }

  async VerifToken(token) {
    const bdd = new Bdd();
    const pool = await bdd.connect();

    const rows = await pool.query("SELECT * FROM users WHERE token = ?", [token]);

    bdd.end();

    if(rows.length === 0){
      return false;
    }
    return true;
  }

  async CreateToken() {

  }

  async Login(username, password) {
    if(! await this.VerifLogin(username, password)){
      return false;
    }
    // generate token
    let token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // save token in db
    const bdd = new Bdd();
    const pool = await bdd.connect();

    try{
      await pool.query("UPDATE users SET token = ? WHERE username = ?", [token, username]);
    }catch(e){
      console.log(e);
      bdd.end();
      return false;
    }

    bdd.end();
    // return token
    return token;
  }

}