'use client'
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '@/css/charts.css'
import "chart.js/auto";

const StatsDonutChart = ({title, labels, stats, colors, displayNum}) => {
    const data = {
        // labels: labels,
        datasets: [{
            //label: `${title}`,
            data: stats,
            backgroundColor: colors,
            borderWidth: 1,
            borderColor: colors[0],
        }],
        
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '50%',
        layout: {
            padding: 1,
        }
    }

  return (
    <div id='doughnut-chart-container' className='relative h-[12vmin] pb-2 striped-bg' style={{marginRight: '5%'}}>
        <Doughnut data={data} options={options}/>
        <div id='display-percent' 
             className='absolute w-[50%] text-right right-0 bottom-0 pr-2'
             style={{fontSize: '4vmin'}}>{displayNum}</div>
    </div>
  )
}

export default StatsDonutChart