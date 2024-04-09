"use client";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Legend, ArcElement } from "chart.js";
import { InsertAssetAllocation } from "./asset-allocation-form";

Chart.register(Tooltip, Legend, ArcElement);

export default function AssetPieChart({
  assetAllocations,
}: {
  assetAllocations: InsertAssetAllocation[];
}) {
  return (
    <Pie
      data={{
        labels: assetAllocations.map((allocation) => allocation.type),
        datasets: [
          {
            data: assetAllocations.map(
              (allocation) => allocation.target_allocation
            ),
            backgroundColor: assetAllocations.map(
              () => `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`
            ),
            hoverOffset: 4,
          },
        ],
      }}
      options={{
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";

                label += context.parsed;
                label += "%";
                return label;
              },
            },
          },
        },
      }}
    />
  );
}
