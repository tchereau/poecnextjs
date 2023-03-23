import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import statistiques_style from "../../styles/Statistiques.module.css";
import { useState } from "react";

Chart.register(...registerables);

interface Commandes {
  commandes: any;
}
function stackBarChart(commandes: Commandes) {
  const [orderByMonth, setOrderByMonth] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [dataLoaded, setDataLoaded] = useState(false);
  function getData() {
    var orders = [[], [], [], [], [], [], [], [], [], [], [], []];
    commandes.commandes.map((commande: any) => {
      const date = new Date(commande.Date);
      var mois = date.getMonth();
      var annee = date.getFullYear();
      if (annee == 2023) orders[mois].push(commande);
    });
    setOrderByMonth(orders); // mettre à jour l'état directement
    setDataLoaded(true); // mettre à jour l'état de chargement des données
  }
  useEffect(() => {
    getData();
  }, [commandes]);

  useEffect(() => {
    if (dataLoaded) {
      if (document.getElementById("myChart")) {
        var ctx = document.getElementById("myChart").getContext("2d");
      }
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
          ],
          datasets: [
            {
              data: [
                orderByMonth[0].length,
                orderByMonth[1].length,
                orderByMonth[2].length,
                orderByMonth[3].length,
                orderByMonth[4].length,
                orderByMonth[5].length,
                orderByMonth[6].length,
                orderByMonth[7].length,
                orderByMonth[8].length,
                orderByMonth[9].length,
                orderByMonth[10].length,
                orderByMonth[11].length,
              ],
              label: "Commandes",
              borderColor: "#3cba9f",
              backgroundColor: "#71d1bd",
              borderWidth: 2,
            },
          ],
        },
      });
      return function cleanup() {
        myChart.destroy();
      };
    }
  }, [orderByMonth]);

  return (
    <>
      {/* Stacked chart */}

      <div className={statistiques_style.container}>
        <h3>Commandes année en cours</h3>
        <canvas id="myChart"></canvas>
      </div>
    </>
  );
}

export default stackBarChart;
