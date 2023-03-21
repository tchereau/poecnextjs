import { useEffect, useState } from "react";

interface Client {
  idClient: number;
  Siret: string;
  NomSociete: string;
  Dirigeant: string;
  NumVoie: number;
  Voie: string;
  CodePostal: number;
  Ville: string;
  Telephone: number;
}

export default function ProductAdd() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/clients", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: document.cookie
              .split("=")[1]
              .split(" ")[0]
              .slice(0, -1),
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

  return (
    <div>
      <h2>Liste des commandes</h2>
      <div>
        <table>
          <tbody>
            {clients.map((client) => (
              <tr key={client.idClient}>
                <td>{client.NomSociete}</td>
                <td>{client.Ville}</td>
                <td>{client.Telephone}</td>
                <td>{client.Voie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
