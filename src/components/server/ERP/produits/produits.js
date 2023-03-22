export default class Produits {

  idProduit;
  CodeProduit;
  Libelle;
  Prix;

  constructor(idProduit, CodeProduit, Libelle, Prix) {
    this.idProduit = idProduit;
    this.CodeProduit = CodeProduit;
    this.Libelle = Libelle;
    this.Prix = Prix;
  }

  get idProduit() {
    return this.idProduit;
  }

  set idProduit(idProduit) {
    this.idProduit = idProduit;
  }

  get CodeProduit() {
    return this.CodeProduit;
  }

  set CodeProduit(CodeProduit) {
    this.CodeProduit = CodeProduit;
  }

  get Libelle() {
    return this.Libelle;
  }

  set Libelle(Libelle) {
    this.Libelle = Libelle;
  }

  get Prix() {
    return this.Prix;
  }

  set Prix(Prix) {
    this.Prix = Prix;
  }
}