import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type WidgetCardProps = {
  title: string;
  total: number;
  percent: number;
  color: string;
  icon: React.ReactNode;
  chartSeries: number[];
  categories: string[];
};

function darken(hex: string, amount: number) {
  const col = hex.replace("#", "");
  const num = parseInt(col, 16);
  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00ff) - amount;
  let b = (num & 0x0000ff) - amount;
  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;
  return `rgb(${r}, ${g}, ${b})`;
}

export default function WidgetCard({
  title,
  total,
  percent,
  color,
  icon,
  chartSeries,
  categories,
}: WidgetCardProps) {
  const isNegative = percent < 0;
  const textColor = darken(color, 50);

  const chartOptions: ApexOptions = {
    chart: { sparkline: { enabled: true }, toolbar: { show: false } },
    stroke: { width: 2, curve: "smooth" },
    colors: [darken(color, 40)],
    xaxis: { categories },
    tooltip: { enabled: false },
    grid: { padding: { top: 0, bottom: 0, left: 0, right: 0 } },
  };

  const compactTotal = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(total);

  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1
        p-md xs:p-lg md:p-xl
        min-h-[150px] sm:min-h-[180px] md:min-h-[200px]
      `}
      style={{ background: `linear-gradient(135deg, ${color}33, ${color}99)` }}
    >
      <div className="absolute inset-0 backdrop-blur-sm opacity-60" />

      <div className="relative z-10 mb-sm sm:mb-md w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/35 rounded-xl shadow-inner">
        {icon}
      </div>

      <div
        className={`
          absolute top-sm right-md sm:top-md sm:right-lg z-10 font-medium
          flex items-center text-xs sm:text-sm
        `}
        style={{ color: isNegative ? "#E53935" : "#2E7D32" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 ${
            isNegative ? "rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 10a1 1 0 011.707-.707L10 12.586l3.293-3.293A1 1 0 0115 10v6a1 1 0 11-2 0v-3.586l-2.293 2.293a1 1 0 01-1.414 0L7 12.414V16a1 1 0 11-2 0v-6z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          {percent > 0 ? "+" : ""}
          {percent}%
        </span>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-sm sm:gap-md">
        <div>
          <p
            className="font-semibold text-[12.5px] sm:text-sm"
            style={{ color: textColor }}
          >
            {title}
          </p>
          <p
            className="mt-xs sm:mt-xs font-extrabold text-xl sm:text-2xl md:text-3xl"
            style={{ color: textColor }}
          >
            {compactTotal}
          </p>
        </div>

        <div className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16">
          <Chart
            type="line"
            series={[{ data: chartSeries }]}
            options={chartOptions}
            height="100%"
          />
        </div>
      </div>

      <div className="absolute top-[-40px] left-[-20px] w-[220px] sm:w-[250px] h-[220px] sm:h-[250px] bg-white opacity-20 rounded-full blur-3xl z-0" />
    </div>
  );
}
