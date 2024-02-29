"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import Sidebar from "@/components/sidebar";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#99ffff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

const dataT = {
  labels: [
    "Taste",
    "Quality",
    "Service",
    "Ambiance",
    "Value for Money",
    "Variety",
  ],
  datasets: [
    {
      label: "Fish and Chip Shop Ratings",
      data: [4, 5, 3, 2, 4, 4],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const RadarChart: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState(dataT);

  const onGenerateClick = () => {
    const chart = JSON.parse(inputText);
    setData(chart);
  };

  console.log(data);

  return (
    <div className="flex flex-row w-screen h-screen">
      <Sidebar
        inputText={inputText}
        onInputChange={setInputText}
        onGenerateClick={onGenerateClick}
      />

      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="bg-[#2C2C30] w-full px-2 py-4"
      >
        <Radar data={data} />
      </div>
    </div>
  );
};

export default RadarChart;
