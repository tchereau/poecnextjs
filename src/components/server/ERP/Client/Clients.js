export default class Clients{

  id;
  Siret;
  NomSociete;
  NumVoie;
  NomVoie;
  CodePostal;
  Ville;
  Dirigeant;
  Telephone;

  constructor(id, Siret, NomSociete, NumVoie, NomVoie, CodePostal, Ville, Dirigeant, Telephone) {
    this.id = id;
    this.Siret = Siret;
    this.NomSociete = NomSociete;
    this.NumVoie = NumVoie;
    this.NomVoie = NomVoie;
    this.CodePostal = CodePostal;
    this.Ville = Ville;
    this.Dirigeant = Dirigeant;
    this.Telephone = Telephone;
  }

  get id() {
    return this.id;
  }

  set id(id) {
    this.id = id;
  }

  get Siret() {
    return this.Siret;
  }

  set Siret(Siret) {
    this.Siret = Siret;
  }

  get NomSociete() {
    return this.NomSociete;
  }

  set NomSociete(NomSociete) {
    this.NomSociete = NomSociete;
  }

  get NumVoie() {
    return this.NumVoie;
  }

  set NumVoie(NumVoie) {
    this.NumVoie = NumVoie;
  }

  get NomVoie() {
    return this.NomVoie;
  }

  set NomVoie(NomVoie) {
    this.NomVoie = NomVoie;
  }

  get CodePostal() {
    return this.CodePostal;
  }

  set CodePostal(CodePostal) {
    this.CodePostal = CodePostal;
  }

  get Ville() {
    return this.Ville;
  }

  set Ville(Ville) {
    this.Ville = Ville;
  }

  get Dirigeant() {
    return this.Dirigeant;
  }
  
  set Dirigeant(Dirigeant) {
    this.Dirigeant = Dirigeant;
  }

  get Telephone() {
    return this.Telephone;
  }

  set Telephone(Telephone) {
    this.Telephone = Telephone;
  }
}