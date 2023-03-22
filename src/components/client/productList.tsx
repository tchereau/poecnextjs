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
  openClientView,
  closeView,
}: OrderProps) {
  const [cookies, setCookie] = useCookies();
  const [produits, setProduits] = useState<Produit[]>([]);
  var [currentProduits, setCurrentProduits] = useState<Produit[]>([]);
  function deleteProduit(idProduit: any) {
    fetch("/api/command/suppresion", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: cookies.token,
      },
      body: JSON.stringify({
        idProduit: idProduit,
      }),
    });
  }

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
    setCurrentProduits(produits);
  }, [produits]);

  const thead = () => {
    if (produits.length == 0) return [];
    var key = [];
    for (var keys in produits[0]) {
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
    setCurrentProduits(produits);
    setCurrentProduits((prevProduitTab) =>
      prevProduitTab.filter((produit) => {
        if (query != undefined)
          return (
            produit["Libelle"]
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            produit["CodeProduit"]
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase())
          );
      })
    );
  }, [query]);

  return (
    <div className={client_list_styles.center}>
      <h2>Liste des Produits</h2>
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
            {currentProduits.map((value, index) => {
              return (
                <tr
                  key={index}
                  className={client_list_styles.tr}
                  onClick={() => {
                    openClientView();
                    getClient(value);
                    closeList();
                  }}
                >
                  <td className={client_list_styles.td}>
                    {value["idProduit"]}
                  </td>
                  <td className={client_list_styles.td}>
                    {value["CodeProduit"]}
                  </td>
                  <td className={client_list_styles.td}>{value["Libelle"]}</td>
                  <td className={client_list_styles.td}>{value["Prix"]}</td>
                  <td>
                    <button
                      className={client_list_styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduit(value["idProduit"]);
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
    </div>
  );
}
