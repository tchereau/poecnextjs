import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import statistiques_style from "../../styles/Statistiques.module.css";
import { useState } from "react";

Chart.register(...registerables);

interface Commandes {
  commandes: any;
}
function stackBarChart(commandes: Commandes) {
  const [orderByMonth, setOrderByMonth] = useState<any>([]);

  function getData() {
    var orders = [[], [], [], [], [], [], [], [], [], [], [], []];

    commandes.commandes.map((commande: any) => {
      console.log(commande.Date);
      const date = new Date(commande.Date);
      var mois = date.getMonth();
      orders[mois].push(commande);
    });
    return orders;
  }

  const orders = getData();
  console.log(orders);
  console.log(orders[0]);

  useEffect(() => {
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
              orders[0].length,
              orders[1].length,
              orders[2].length,
              orders[3].length,
              orders[4].length,
              orders[5].length,
              orders[6].length,
              orders[7].length,
              orders[8].length,
              orders[9].length,
              orders[10].length,
              orders[11].length,
            ],

            label: "Accepted",
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            borderWidth: 2,
          },
        ],
      },
    });
  }, []);

  return (
    <>
      {/* Stacked chart */}

      <div className={statistiques_style.container}>
        <canvas id="myChart"></canvas>
      </div>
    </>
  );
}

export default stackBarChart;
