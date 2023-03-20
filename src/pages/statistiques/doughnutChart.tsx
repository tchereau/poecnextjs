import { useEffect } from "react";
import { Chart } from "chart.js";
import statistiques_style from "../../styles/Statistiques.module.css";
function Example() {
  useEffect(() => {
    var ctx = document.getElementById("doughnutChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Accepted", "Pending", "Rejected", "Completed", "Failed"],
        datasets: [
          {
            data: [70, 10, 6, 80, 9],
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
            backgroundColor: [
              "rgb(75, 192, 192 )",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });
  }, []);

  return (
    <>
      {/* Doughnut chart */}

      <div className={statistiques_style.container}>
        <canvas id="doughnutChart"></canvas>
      </div>
    </>
  );
}

export default Example;
