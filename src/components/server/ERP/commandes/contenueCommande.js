export default class ContenueCommandes {

  idCommande;
  NumeroCommandes;
  Client;
  Date;

  constructor(id, NumeroCommandes, Client, NumVoie, Date) {
    this.idCommande = id;
    this.NumeroCommandes = NumeroCommandes;
    this.Client = Client;
    this.Date = Date;
  }

  get idCommande() {
    return this.idCommande;
  }

  set idCommande(idCommande) {
    this.idCommande = idCommande;
  }

  get NumeroCommandes() {
    return this.NumeroCommandes;
  }

  set NumeroCommandes(NumeroCommandes) {
    this.NumeroCommandes = NumeroCommandes;
  }

  get Client() {
    return this.Client;
  }

  set Client(Client) {
    this.Client = Client;
  }

  get Date() {
    return this.Date;
  }

  set Date(Date) {
    this.Date = Date;
  }
}