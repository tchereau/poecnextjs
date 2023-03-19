import client_add_style from "@/styles/ClientAdd.module.css";

function validateForm(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const entreprise = formData.get("entreprise");
  const numeroVoie = formData.get("numeroVoie");
  const rue = formData.get("rue");
  const codePostal = formData.get("codePostal");
  const ville = formData.get("ville");
  const dirigeant = formData.get("dirigeant");
  const numeroTelephone = formData.get("numeroTelephone");

  console.log(formData);
}

export default function clientAdd() {
  return (
    <>
      <div className={client_add_style.container}>
        <h2>Ajouter un client</h2>
        <form className={client_add_style.form} onSubmit={validateForm}>
          <label className={client_add_style.label}>
            Entreprise
            <input type="text" name="entreprise" placeholder="Entreprise" />
          </label>

          <label className={client_add_style.label}>
            Numéro de voie
            <input type="text" name="numeroVoie" placeholder="Numéro de voie" />
          </label>

          <label className={client_add_style.label}>
            Rue
            <input type="text" name="rue" placeholder="Rue" />
          </label>

          <label className={client_add_style.label}>
            Code postal
            <input type="text" name="codePostal" placeholder="Code postal" />
          </label>

          <label className={client_add_style.label}>
            Ville
            <input type="text" name="ville" placeholder="Ville" />
          </label>

          <label className={client_add_style.label}>
            Dirigeant
            <input type="text" name="dirigeant" placeholder="Dirigeant" />
          </label>

          <label className={client_add_style.label}>
            Numéro de téléphone
            <input
              type="text"
              name="numeroTelephone"
              placeholder="Numéro de téléphone"
            />
          </label>

          <button type="submit">Ajouter</button>
        </form>
      </div>
    </>
  );
}
