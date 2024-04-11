// // TimePeriodChart.js
// import React, { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';

// const TimePeriodChart = ({ incomeData }) => {
//   const [timePeriodData, setTimePeriodData] = useState([]);

//   useEffect(() => {
//     if (incomeData.length === 0) return;

//     // Aggregate total income for each time period
//     const aggregatedData = {
//       Day: 0,
//       Week: 0,
//       Month: 0,
//       Year: 0,
//     };

//     incomeData.forEach((income) => {
//       const incomeAmount = parseFloat(income.amount);
//       const incomeDate = new Date(income.date);

//       // Extract day, week, month, and year from the income date
//       const day = incomeDate.getDate();
//       const week = Math.ceil(day / 7); // Assuming week starts on Sunday
//       const month = incomeDate.getMonth() + 1; // Month is 0-based
//       const year = incomeDate.getFullYear();

//       // Increment total income for the corresponding time period
//       aggregatedData.Day += incomeAmount;
//       aggregatedData.Week += incomeAmount;
//       aggregatedData.Month += incomeAmount;
//       aggregatedData.Year += incomeAmount;
//     });

//     // Update state with aggregated data
//     setTimePeriodData(Object.values(aggregatedData));
//   }, [incomeData]);

//   useEffect(() => {
//     // Draw the time period chart when timePeriodData changes
//     const timePeriodChartCanvas = document.getElementById('timePeriodChart');
//     const existingChart = Chart.getChart(timePeriodChartCanvas);

//     if (existingChart) {
//       existingChart.destroy();
//     }

//     // Display the time period chart
//     const ctx = timePeriodChartCanvas.getContext('2d');
//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Day', 'Week', 'Month', 'Year'],
//         datasets: [
//           {
//             label: 'Total Income',
//             data: timePeriodData,
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.7)',
//               'rgba(54, 162, 235, 0.7)',
//               'rgba(255, 206, 86, 0.7)',
//               'rgba(75, 192, 192, 0.7)',
//             ],
//           },
//         ],
//       },
//     });
//   }, [timePeriodData]);

//   return <canvas id="timePeriodChart" width="400" height="400"></canvas>;
// };

// export default TimePeriodChart;
