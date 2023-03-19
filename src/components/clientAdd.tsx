import client_add_style from "@/styles/ClientAdd.module.css";

interface ClientProps {
  useClient?: object;
}

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

function objectToArray(object: any) {
  var monTableau = Object.keys(object.useClient).map(function (cle) {
    return [object.useClient[cle]];
  });
  return monTableau;
}

var client: any;

export default function clientAdd(useClient?: ClientProps) {
  if (useClient?.useClient) {
    client = objectToArray(useClient);
    console.log(client);
  }
  return (
    <>
      <div className={client_add_style.container}>
        <h2>
          {useClient?.useClient ? "Modifier un client" : "Ajouter un client"}
        </h2>
        <form className={client_add_style.form} onSubmit={validateForm}>
          <label className={client_add_style.label}>
            Entreprise
            <input
              type="text"
              name="entreprise"
              placeholder="Entreprise"
              value={useClient?.useClient ? client[0] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Numéro de voie
            <input
              type="text"
              name="numeroVoie"
              placeholder="Numéro de voie"
              value={useClient?.useClient ? client[1] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Rue
            <input
              type="text"
              name="rue"
              placeholder="Rue"
              value={useClient?.useClient ? client[2] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Code postal
            <input
              type="text"
              name="codePostal"
              placeholder="Code postal"
              value={useClient?.useClient ? client[3] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Ville
            <input
              type="text"
              name="ville"
              placeholder="Ville"
              value={useClient?.useClient ? client[4] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Dirigeant
            <input
              type="text"
              name="dirigeant"
              placeholder="Dirigeant"
              value={useClient?.useClient ? client[4] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Numéro de téléphone
            <input
              type="text"
              name="numeroTelephone"
              placeholder="Numéro de téléphone"
              value={useClient?.useClient ? client[5] : ""}
            />
          </label>

          <button type="submit">
            {useClient?.useClient ? "Modifier" : "Ajouter"}
          </button>
        </form>
      </div>
    </>
  );
}
