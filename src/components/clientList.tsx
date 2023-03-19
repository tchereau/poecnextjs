import client_list_styles from "@/styles/Array.module.css";
import client from "../../public/clients.json";

const clientTab = client.clients;
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

function editClient(client: any) {
  console.log(client);
}

export default function clientList() {
  return (
    <div className={client_list_styles.center}>
      <h2>Liste des Clients</h2>
      <div className={client_list_styles.table_container}>
        <table className={client_list_styles.table}>
          <thead>
            <tr>
              {thead().map((value: string, index: number) => {
                return <th className={client_list_styles.th}>{value}</th>;
              })}
            </tr>
          </thead>
          <tbody className={client_list_styles.tbody}>
            {clientTab.map((value, index) => {
              return (
                <tr key={index} className={client_list_styles.tr}>
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
                      onClick={() => {
                        deleteClient(value);
                      }}
                    >
                      Supprimer
                    </button>
                  </td>
                  <td>
                    <button
                      className={client_list_styles.button}
                      onClick={() => {
                        editClient(value);
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
