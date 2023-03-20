import Header from "@/components/header";
import StackBarChart from "./stackBarChart";
import LineChart from "./lineChart";
import DoughnutChart from "./doughnutChart";
import PolarArea from "./polarArea";
import statistiques_style from "../../styles/Statistiques.module.css";

export default function Example() {
  return (
    <>
      <Header />
      <h2>Statistiques</h2>
      <div className={statistiques_style.flex}>
        <StackBarChart />
        <LineChart />
        <DoughnutChart />
        <PolarArea />
      </div>
    </>
  );
}
