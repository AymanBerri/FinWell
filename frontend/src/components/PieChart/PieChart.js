import React from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, chartId }) => {
  const createPieChart = (data, chartId) => {
    const ctx = document.getElementById(chartId).getContext('2d');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(data),
        datasets: [{
          data: Object.values(data),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            // Add more colors as needed
          ],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });

    return chart;
  };

  // Ensure the chart is created only once
  React.useEffect(() => {
    const chartInstance = createPieChart(data, chartId);

    return () => {
      chartInstance.destroy();
    };
  }, [data, chartId]);

  return <canvas id={chartId} height={50} />;
};

export default PieChart;
