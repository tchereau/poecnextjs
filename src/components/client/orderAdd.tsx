import client_add_style from "@/styles/ClientAdd.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

function objectToArray(object: any) {
  var monTableau = Object.keys(object).map(function (cle) {
    return [object[cle]];
  });
  return monTableau;
}

var client: any;

interface OrderProps {
  useClient?: any;
  closeEdit: () => void;
  openList: () => void;
}

export default function commandeAdd({
  useClient,
  closeEdit,
  openList,
}: OrderProps) {
  const [cookies, setCookie] = useCookies();
  function validateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Client = Number(formData.get("idClient"));
    const Date = formData.get("Date");
    const NumeroCommandes = formData.get("NumeroCommandes");

    const commande = {
      NumeroCommandes: NumeroCommandes,
      Client: Client,
      Date: Date,
    };
    async function postClient() {
      try {
        const response = await fetch("/api/commande/ajout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: cookies.token,
          },
          body: JSON.stringify(commande),
        });

        if (!response.ok) {
          throw new Error(
            "Une erreur s'est produite lors de l'insertion des données."
          );
        }

        const data = await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    postClient();
  }
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
        <h2>{useClient ? "Modifier une commande" : "Ajouter une commande"}</h2>
        <form className={client_add_style.form} onSubmit={validateForm}>
          <label className={client_add_style.label}>
            Client (idClient)
            <input
              type="text"
              name="idClient"
              placeholder="idClient"
              defaultValue={useClient ? client[0] : ""}
            />
          </label>
          <label className={client_add_style.label}>
            Date
            <input
              type="date"
              name="Date"
              placeholder="Date"
              defaultValue={useClient ? client[1] : ""}
            />
          </label>
          <label className={client_add_style.label}>
            Numéro de commande
            <input
              type="text"
              name="NumeroCommandes"
              placeholder="Entreprise"
              defaultValue={useClient ? client[2] : ""}
            />
          </label>
          <button type="submit">{useClient ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>
    </>
  );
}
