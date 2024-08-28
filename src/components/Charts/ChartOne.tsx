// components/ChartOne.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartOne = ({ totalClient, totalTask, totalStaff }) => {
  const data = {
    labels: ['Client', 'Task', 'Staff'],
    datasets: [
      {
        data: [totalClient, totalTask, totalStaff],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Doughnut className='mt-10' data={data} />;
};

export default ChartOne;