"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
}

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Cases",
      data: [12, 19, 15, 22, 24, 18],
      backgroundColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      label: "Documents",
      data: [45, 82, 68, 74, 96, 85],
      backgroundColor: "rgba(99, 102, 241, 0.5)",
    },
  ],
}

export function Overview() {
  return (
    <div className="h-[350px]">
      <Bar options={options} data={data} />
    </div>
  )
}

