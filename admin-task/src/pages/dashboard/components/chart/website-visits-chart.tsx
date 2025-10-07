import Chart from "react-apexcharts";
import { useChart } from "../../hooks/useChart";

export default function WebsiteVisitsChart() {
  const chartOptions = useChart({
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    colors: ["#2065D1", "#FFB300"],
    legend: { position: "top" },
  });

  const chartSeries = [
    { name: "Team A", data: [44, 55, 41, 67, 22, 43, 21, 49, 62] },
    { name: "Team B", data: [13, 23, 20, 8, 13, 27, 33, 12, 20] },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Website Visits</h2>
      <Chart
        type="bar"
        series={chartSeries}
        options={chartOptions}
        height={351}
      />
    </div>
  );
}
