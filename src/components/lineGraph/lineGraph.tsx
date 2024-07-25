import styles from "./lineGraph.module.css";

import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  Tooltip,
  Legend
} from "chart.js";
import { ChartOptions } from "chart.js";
import Loader from "../loader/loader";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale, Tooltip, Legend);

type TGraphProps = {
  label: string;
  data: number[];
  labels: string[];
  title: React.ReactNode;
  isFetching: boolean;
};

const options: ChartOptions<"line"> = {
  scales: {
    x: {
      title: {
        display: false
      },
      grid: {
        display: false
      },
      border: {
        color: "black"
      },
      ticks: {
        maxRotation: 90,
        color: "black",
        font: {
          size: 12
        }
      }
    },
    y: {
      title: {
        display: false
      },
      border: {
        color: "black"
      },
      ticks: {
        color: "black",
        font: {
          size: 12
        }
      }
    }
  },
  plugins: {
    title: {
      display: false
    },
    legend: {
      display: false
    }
  },
  elements: {
    point: {
      borderWidth: 1,
      radius: 4,
      hitRadius: 10,
      hoverRadius: 7,
      pointStyle: "circle"
    },
    line: {
      tension: 0.4,
      borderWidth: 1
    }
  }
};

export default function LineGraph({ label, data, labels, title, isFetching }: TGraphProps) {
  if (!data) {
    return null;
  }

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: "#6A75DF",
        backgroundColor: "#fff",
        fill: false,
        tension: 0.1
      }
    ]
  };

  return (
    <>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.loaderBox}>
        {isFetching && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        <div className={`${isFetching ? styles.blur : ""}`}>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </>
  );
}
