import Chart from "react-apexcharts";
import { useChart } from "../../hooks/useChart";

export default function CurrentVisitsChart() {
  const chartOptions = useChart({
    labels: ["America", "Asia", "Europe", "Africa"],
    colors: ["#2065D1", "#54D62C", "#FFC107", "#FF4842"],
  });

  const chartSeries = [43.8, 31.3, 18.8, 6.3];

  return (
    <div className="rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Current Visits</h2>
      <Chart
        type="donut"
        series={chartSeries}
        options={chartOptions}
        height={351}
      />
    </div>
  );
}
