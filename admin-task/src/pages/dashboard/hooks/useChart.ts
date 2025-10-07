import type { ApexOptions } from "apexcharts";

export function useChart(options: ApexOptions): ApexOptions {
  const baseOptions: ApexOptions = {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: false },
    legend: { show: true, position: "bottom" },
    stroke: { width: 2, curve: "smooth" },
    grid: { strokeDashArray: 3, borderColor: "#e0e0e0" },
  };

  return { ...baseOptions, ...options };
}
