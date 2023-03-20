import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import statistiques_style from "../../styles/Statistiques.module.css";

Chart.register(...registerables);

function stackBarChart() {
  useEffect(() => {
    if (document.getElementById("myChart")) {
      var ctx = document.getElementById("myChart").getContext("2d");
    }
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            data: [70, 90, 44, 60, 83, 90, 100],
            label: "Accepted",
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            borderWidth: 2,
          },
          {
            data: [10, 21, 60, 44, 17, 21, 17],
            label: "Pending",
            borderColor: "#ffa500",
            backgroundColor: "#ffc04d",
            borderWidth: 2,
          },
          {
            data: [6, 3, 2, 2, 7, 0, 16],
            label: "Rejected",
            borderColor: "#c45850",
            backgroundColor: "#d78f89",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
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
