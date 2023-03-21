import client_list_styles from "@/styles/Array.module.css";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

interface ClientProps {
  openEdit: () => void;
  closeList: () => void;
  getClient: (client: any) => void;
  openClientView: () => void;
  closeView: () => void;
}

interface Client {
  Siret: string;
  NomSociete: string;
  Dirigeant: string;
  NumVoie: number;
  Voie: string;
  CodePostal: number;
  Ville: string;
  Telephone: number;
}

export default function clientList({
  openEdit,
  getClient,
  closeList,
  openClientView,
  closeView,
}: ClientProps) {
  const [clients, setClients] = useState<Client[]>([]);
  var [currentClient, setCurrentClient] = useState<Client[]>([]);
  const [cookies, setCookie] = useCookies();
  function deleteClient(client: any) {
    fetch("/api/clientDelete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: cookies.token,
      },
      body: JSON.stringify({
        id: client.idClient,
      }),
    });
  }
  useEffect(() => {
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
        setClients(data.clients);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentClient(clients);
  }, [clients]);

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
      prevClientTab.filter((client) => {
        if (query != undefined)
          return (
            client["NomSociete"].toLowerCase().includes(query.toLowerCase()) ||
            client["Ville"].toLowerCase().includes(query.toLowerCase()) ||
            client["Dirigeant"].toLowerCase().includes(query.toLowerCase()) ||
            client["Voie"].toLowerCase().includes(query.toLowerCase())
          );
      })
    );
  }, [query]);

  return (
    <div className={client_list_styles.center}>
      <h2>Liste des Clients</h2>
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
              {thead()
                .splice(1, 10)
                .map((value: string, index: number) => {
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
                  <td className={client_list_styles.td}>{value["Siret"]}</td>
                  <td className={client_list_styles.td}>
                    {value["NomSociete"]}
                  </td>
                  <td className={client_list_styles.td}>{value["NumVoie"]}</td>
                  <td className={client_list_styles.td}>{value["Voie"]}</td>
                  <td className={client_list_styles.td}>{value["Ville"]}</td>
                  <td className={client_list_styles.td}>
                    {value["CodePostal"]}
                  </td>
                  <td className={client_list_styles.td}>
                    {value["Dirigeant"]}
                  </td>
                  <td className={client_list_styles.td}>
                    {value["Telephone"]}
                  </td>
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
