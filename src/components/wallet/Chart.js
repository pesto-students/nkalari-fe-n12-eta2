import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Top-up', 'Rose', 'Cake', 'Bike'],
  datasets: [
    {
      label: '# of Votes',
      data: [2000, 1200, 500, 1200],
      backgroundColor: [
        '#3B82F6',
                '#10B981',
                '#6366F1',
                '#F59E0B',
      ],
      borderWidth: 1,
    },
  ],
};

export default function Chart() {
  return <PolarArea data={data} />;
}