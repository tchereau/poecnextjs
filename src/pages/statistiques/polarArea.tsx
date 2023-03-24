import { useEffect } from "react";
import { Chart } from "chart.js";
import statistiques_style from "../../styles/Statistiques.module.css";

function Example() {
  useEffect(() => {
    var ctx = document.getElementById("polarChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bubble",
      data: {
        labels: ["Accepted", "Pending", "Rejected", "Completed", "Failed"],
        datasets: [
          {
            label: "# of Votes",
            data: [70, 10, 6, 80, 9],
            backgroundColor: [
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(153, 102, 255)",
            ],
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(153, 102, 255)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }, []);
  return (
    <>
      {/* line chart */}
      <div className={statistiques_style.container}>
        <canvas id="polarChart"></canvas>
      </div>
    </>
  );
}

export default Example;
