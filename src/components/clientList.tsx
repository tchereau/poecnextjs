import styles from "@/styles/Array.module.css";
import client from "../../public/clients.json";

const clientTab = client.clients;
const thead = () => {
  var key = [];
  for (var keys in clientTab[0]) {
    key.push(keys);
  }
  return key;
};

export default function clientList() {
  return (
    <div className={styles.center}>
      <h2 className={styles.h2}>Liste des Clients</h2>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {thead().map((value: string, index: number) => {
                return <th className={styles.th}>{value}</th>;
              })}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {clientTab.map((value, index) => {
              return (
                <tr key={index} className={styles.tr}>
                  <td className={styles.td}>{value["Nom de société"]}</td>
                  <td className={styles.td}>{value["Rue"]}</td>
                  <td className={styles.td}>{value["Voie"]}</td>
                  <td className={styles.td}>{value["Ville"]}</td>
                  <td className={styles.td}>{value["Code Postal"]}</td>
                  <td className={styles.td}>{value["Dirigeant"]}</td>
                  <td className={styles.td}>{value["Téléphone"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
