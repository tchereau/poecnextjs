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
  NumeroCommandes: number;
  Client: number;
  Date: Date;
}

export default function clientList({
  openEdit,
  getClient,
  closeList,
  openClientView,
  closeView,
}: OrderProps) {
  const [cookies, setCookie] = useCookies();
  const [commandes, setCommandes] = useState<Commande[]>([]);
  var [currentCommandes, setCurrentCommandes] = useState<Commande[]>([]);

  useEffect(() => {
    function deleteCommande(idCommande: any) {
      fetch("/api/deleteOrder", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: cookies.token,
        },
        body: JSON.stringify({
          id: idCommande,
        }),
      });
    }
    async function fetchData() {
      try {
        const response = await fetch("/api/clients", {
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
    setCurrentCommandes(commandes);
  }, [commandes]);

  const thead = () => {
    var key = [];
    for (var keys in clients[0]) {
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
    setCurrentClient(clients);
    setCurrentClient((prevClientTab) =>
      prevClientTab.filter((commande) => {
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
            commande["Date"]
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase())
          );
      })
    );
  }, [query]);

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
            {currentClient.map((value, index) => {
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
                    {value["NumeroCommandes"]}
                  </td>
                  <td className={client_list_styles.td}>
                    {value["Date"].toDateString()}
                  </td>
                  <td className={client_list_styles.td}>{value["Client"]}</td>

                  <td>
                    <button
                      className={client_list_styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClient(value);
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
