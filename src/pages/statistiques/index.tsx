import Header from "@/components/client/header";
import StackBarChart from "./stackBarChart";
import LineChart from "./lineChart";
import DoughnutChart from "./doughnutChart";
import PolarArea from "./polarArea";
import statistiques_style from "../../styles/Statistiques.module.css";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export default function Example() {
  const [cookies, setCookie] = useCookies();
  const [commandes, setCommandes] = useState<any>([]);
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
  return (
    <>
      <Header />
      <h2>Statistiques</h2>
      <div className={statistiques_style.flex}>
        <StackBarChart commandes={commandes} />
        <LineChart />
        <DoughnutChart />
        <PolarArea />
      </div>
    </>
  );
}
