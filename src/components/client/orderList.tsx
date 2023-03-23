import client_list_styles from "@/styles/Array.module.css";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

interface OrderProps {
  openEdit: () => void;
  closeList: () => void;
  getClient: (client: any) => void;
  openClientView: () => void;
  closeView: () => void;
}

interface Commande {
  idCommande: number;
  NumeroCommandes: number;
  Client: number;
  Date: string;
}

interface Produit {
  idProduit: number;
  CodeProduit: number;
  Libelle: string;
  Prix: number;
}

export default function clientList({
  openEdit,
  getClient,
  closeList,
  closeView,
}: OrderProps) {
  const [cookies, setCookie] = useCookies();
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [viewProductisOpen, setViewProductisOpen] = useState(false);
  const [idCommande, setIdCommande] = useState(0);
  const [currentCommandes, setCurrentCommandes] = useState<Commande[]>([]);
  const [orderContent, setOrderContent] = useState<any>([]);
  function deleteCommande(idCommande: any) {
    fetch("/api/commande/suppresion", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: cookies.token,
      },
      body: JSON.stringify({
        idCommande: idCommande,
      }),
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/commande/commandes", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: cookies.token,
          },
        });

        if (!response.ok) {
          throw new Error(
            "Une erreur s'est produite lors de la récupération des données."
          );
        }

        const data = await response.json();
        setCommandes(data.commandes);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/commande/contenue", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: cookies.token,
          },
          body: JSON.stringify({
            id: 3,
          }),
        });

        if (!response.ok) {
          throw new Error(
            "Une erreur s'est produite lors de la récupération des données."
          );
        }

        const data = await response.json();
        setOrderContent(data.contenue);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentCommandes(commandes);
  }, [commandes]);

  const thead = () => {
    var key = [];
    for (var keys in commandes[0]) {
      key.push(keys);
    }
    return key;
  };
  const search = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<any>();

  useEffect(() => {
    document.addEventListener("keyup", () => {
      setQuery(search.current?.value);
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/produit/produits", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: cookies.token,
          },
        });

        if (!response.ok) {
          throw new Error(
            "Une erreur s'est produite lors de la récupération des données."
          );
        }

        const data = await response.json();
        setProduits(data.produits);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentCommandes(commandes);
    setCurrentCommandes((prevCommandeTab) =>
      prevCommandeTab.filter((commande) => {
        if (query != undefined)
          return (
            commande["NumeroCommandes"]
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            commande["NumeroCommandes"]
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            commande["Date"].includes(query.toLowerCase())
          );
      })
    );
  }, [query]);

  function openProductView(idCommande: number) {
    setViewProductisOpen(true);
    setIdCommande(idCommande);
  }

  function addProductToOrder(e: any) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const idCommande = data.get("idCommande");
    const idProduit = data.get("libelleProduct");
    const quantite = data.get("quantite");
    /* fetch("/api/commande/ajoutProduit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: cookies.token,
      },
      body: JSON.stringify({
        idCommande: idCommande,ù
        idProduit: idProduit,
        quantite: quantite,
      }),
    });*/
    console.log(idCommande, idProduit, quantite);
  }
  console.log(orderContent);
  return (
    <div className={client_list_styles.center}>
      <h2>Liste des Commandes</h2>
      <input
        id={client_list_styles.search}
        type="text"
        placeholder="search..."
        ref={search}
      ></input>
      <div className={client_list_styles.table_container}>
        <table className={client_list_styles.table}>
          <thead>
            <tr>
              {thead().map((value: string, index: number) => {
                return (
                  <th key={index} className={client_list_styles.th}>
                    {value}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={client_list_styles.tbody}>
            {currentCommandes.map((value, index) => {
              return (
                <tr
                  key={index}
                  className={client_list_styles.tr}
                  onClick={(e) => {
                    e.preventDefault();
                    openProductView(value.idCommande);
                  }}
                >
                  <td className={client_list_styles.td}>
                    {value["idCommande"]}
                  </td>
                  <td className={client_list_styles.td}>
                    {value["NumeroCommandes"]}
                  </td>
                  <td className={client_list_styles.td}>{value["Client"]}</td>
                  <td className={client_list_styles.td}>{value["Date"]}</td>
                  <td>
                    <button
                      className={client_list_styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCommande(value["idCommande"]);
                      }}
                    >
                      Supprimer
                    </button>
                  </td>
                  <td>
                    <button
                      className={client_list_styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        getClient(value);
                        openEdit();
                        closeList();
                        closeView();
                      }}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {viewProductisOpen && (
        <div className={client_list_styles.product_container}>
          <h3>Commande n°{idCommande}</h3>

          <form
            className={client_list_styles.form_product}
            onSubmit={addProductToOrder}
          >
            <input type="text" value={idCommande} name="idCommande" hidden />

            <select className={client_list_styles.select} name="libelleProduct">
              {produits.map((value, index) => {
                return (
                  <option key={index} value={value["idProduit"]}>
                    {value["Libelle"]}
                  </option>
                );
              })}
            </select>
            <input type="text" name="quantite" placeholder="Quantité" />
            <button type="submit" className={client_list_styles.button}>
              Ajouter
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
