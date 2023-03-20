import client_add_style from "@/styles/ClientAdd.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
  var monTableau = Object.keys(object).map(function (cle) {
    return [object[cle]];
  });
  return monTableau;
}

var client: any;

interface ClientProps {
  useClient?: any;
  closeEdit: () => void;
  openList: () => void;
}

export default function clientAdd({
  useClient,
  closeEdit,
  openList,
}: ClientProps) {
  if (useClient) {
    client = objectToArray(useClient);
  }
  return (
    <>
      <div className={client_add_style.container}>
        {useClient && (
          <span className={client_add_style.back}>
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              onClick={() => {
                openList();
                closeEdit();
              }}
            />
          </span>
        )}
        <h2>{useClient ? "Modifier un client" : "Ajouter un client"}</h2>
        <form className={client_add_style.form} onSubmit={validateForm}>
          <label className={client_add_style.label}>
            Entreprise
            <input
              type="text"
              name="entreprise"
              placeholder="Entreprise"
              defaultValue={useClient ? client[0] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Numéro de voie
            <input
              type="text"
              name="numeroVoie"
              placeholder="Numéro de voie"
              defaultValue={useClient ? client[1] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Rue
            <input
              type="text"
              name="rue"
              placeholder="Rue"
              defaultValue={useClient ? client[2] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Code postal
            <input
              type="text"
              name="codePostal"
              placeholder="Code postal"
              defaultValue={useClient ? client[3] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Ville
            <input
              type="text"
              name="ville"
              placeholder="Ville"
              defaultValue={useClient ? client[4] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Dirigeant
            <input
              type="text"
              name="dirigeant"
              placeholder="Dirigeant"
              defaultValue={useClient ? client[4] : ""}
            />
          </label>

          <label className={client_add_style.label}>
            Numéro de téléphone
            <input
              type="text"
              name="numeroTelephone"
              placeholder="Numéro de téléphone"
              defaultValue={useClient ? client[5] : ""}
            />
          </label>

          <button type="submit">{useClient ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>
    </>
  );
}
