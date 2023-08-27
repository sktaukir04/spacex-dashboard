import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

export function GraphComp(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  window.addEventListener("beforeprint", (event) => {
    function beforePrintHandler() {
      for (let id in ChartJS.instances) {
        ChartJS.instances[id].resize();
      }
    }
    beforePrintHandler()
  });

  const options = {
    responsive: true,
    aspectRatio:2,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const labels = props.labels ?? [
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];
  const datasets = props.datasets ?? [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ];
  const data = {
    labels,
    datasets: datasets,
  };
  return <Bar options={options} data={data} />;
}
