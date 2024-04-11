import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

interface ITemperatureData {
  temperatureData: {
    dates: string[],
    highs: number[],
    lows: number[]
  }
};

const TemperatureChart: React.FC<ITemperatureData> = (props) => {
  const { temperatureData } = props;
  const chartRef = useRef<Chart<"line"> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    createTemperatureChart();
  },[temperatureData]);

  const createTemperatureChart = () => {
    const ctx = canvasRef.current;
    if (!ctx) {
      console.error("Canvas element not found!");
      return;
    }

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: temperatureData.dates,
        datasets: [
          {
            label: 'Highs',
            data: temperatureData.highs,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
          },
          {
            label: 'Lows',
            data: temperatureData.lows,
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false,
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              parser: 'yyyy-MM-dd',
              tooltipFormat: 'MM dd',
              unit: 'day',
              displayFormats: {
                day: 'MMM dd',
              },
            },
            title: {
              display: true,
              text: 'Dates'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        },
      },
    });
  };

  return <canvas id="temperature-chart" ref={canvasRef} />;
};

export default TemperatureChart;
