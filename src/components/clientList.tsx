import client_list_styles from "@/styles/Array.module.css";
import client from "../../public/clients.json";
import { useEffect, useRef, useState } from "react";

interface ClientProps {
  openEdit: () => void;
  closeList: () => void;
  getClient: (client: any) => void;
  openClientView: () => void;
  closeView: () => void;
}

var clientTab = client.clients;

const thead = () => {
  var key = [];
  for (var keys in clientTab[0]) {
    key.push(keys);
  }
  return key;
};

function deleteClient(client: any) {
  console.log(client);
}

export default function clientList({
  openEdit,
  getClient,
  closeList,
  openClientView,
  closeView,
}: ClientProps) {
  const search = useRef<HTMLInputElement>(null);
  var [currentClient, setCurrentClient] = useState(clientTab);
  function addEventSearch() {
    useEffect(() => {
      document.addEventListener("keyup", () => {
        var query = search.current?.value;
        if (query == "") {
          setCurrentClient(clientTab);
        }
        setCurrentClient((prevClientTab) =>
          prevClientTab.filter((client) => {
            if (query != undefined)
              return (
                client.Rue.toLowerCase().includes(query.toLowerCase()) ||
                client["Nom de société"]
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                client["Ville"].toLowerCase().includes(query.toLowerCase()) ||
                client["Dirigeant"]
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                client["Voie"].toLowerCase().includes(query.toLowerCase())
              );
          })
        );
      });
    }, [search]);
  }

  addEventSearch();
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
                    {value["Nom de société"]}
                  </td>
                  <td className={client_list_styles.td}>{value["Rue"]}</td>
                  <td className={client_list_styles.td}>{value["Voie"]}</td>
                  <td className={client_list_styles.td}>{value["Ville"]}</td>
                  <td className={client_list_styles.td}>
                    {value["Code Postal"]}
                  </td>
                  <td className={client_list_styles.td}>
                    {value["Dirigeant"]}
                  </td>
                  <td className={client_list_styles.td}>
                    {value["Téléphone"]}
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
