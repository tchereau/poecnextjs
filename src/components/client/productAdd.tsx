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

export default function productAdd({
  useClient,
  closeEdit,
  openList,
}: OrderProps) {
  const [cookies, setCookie] = useCookies();
  function validateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const idProduit = Number(formData.get("idProduit"));
    const CodeProduit = formData.get("CodeProduit");
    const Libelle = formData.get("Libelle");
    const Prix = Number(formData.get("Prix"));

    const produit = {
      idProduit: idProduit,
      CodeProduit: CodeProduit,
      Libelle: Libelle,
      Prix: Prix,
    };
    async function postProduit() {
      try {
        const response = await fetch("/api/produit/ajout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: cookies.token,
          },
          body: JSON.stringify(produit),
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
    postProduit();
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
        <h2>{useClient ? "Modifier une commande" : "Ajouter un produit"}</h2>
        <form className={client_add_style.form} onSubmit={validateForm}>
          <label className={client_add_style.label}>
            idProduit
            <input
              type="text"
              name="idProduit"
              placeholder="idProduit"
              defaultValue={useClient ? client[0] : ""}
            />
          </label>
          <label className={client_add_style.label}>
            CodeProduit
            <input
              type="text"
              name="CodeProduit"
              placeholder="CodeProduit"
              defaultValue={useClient ? client[1] : ""}
            />
          </label>
          <label className={client_add_style.label}>
            Libelle
            <input
              type="text"
              name="Libelle"
              placeholder="Libelle"
              defaultValue={useClient ? client[2] : ""}
            />
          </label>
          <label className={client_add_style.label}>
            Prix
            <input
              type="text"
              name="Prix"
              placeholder="Prix"
              defaultValue={useClient ? client[3] : ""}
            />
          </label>
          <button type="submit">{useClient ? "Modifier" : "Ajouter"}</button>
        </form>
      </div>
    </>
  );
}
