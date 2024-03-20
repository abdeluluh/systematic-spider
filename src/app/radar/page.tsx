"use client";
import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import ChartJS, { Chart, PluginOptionsByType } from "chart.js/auto";
import Sidebar from "@/components/sidebar";

const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart: Chart, args: unknown, options: any) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#2C2C30";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

ChartJS.register(plugin);

const defaultData = {
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

// Default options object with the defined type
const defaultOptions = {};

const RadarChart: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState(defaultData);
  const [options, setOptions] = useState(defaultOptions);

  const onGenerateClick = () => {
    const dataRegex = /const\s+data\s*=\s*({[^;]+})/;
    const optionsRegex = /const\s+options\s*=\s*({[^;]+})/;

    const dataMatch = dataRegex.exec(inputText);
    const optionsMatch = optionsRegex.exec(inputText);

    let parsedData = defaultData;
    let parsedOptions = defaultOptions;

    if (dataMatch) {
      try {
        parsedData = eval("(" + dataMatch[1] + ")");
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }

    if (optionsMatch) {
      try {
        parsedOptions = eval("(" + optionsMatch[1] + ")");
      } catch (error) {
        console.error("Error parsing options:", error);
      }
    }

    setData(parsedData);
    setOptions(parsedOptions);
  };

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
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;
