import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import '@/css/charts.css'
import "chart.js/auto";

const MobileDonutChart = ({stats, colors, displayNum}) => {
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
        maintainAspectRatio: false,
        cutout: '75%',
        layout :{
            padding: 0,
        }
    }

  return (
    <div className='relative h-full pb-2'>
        <div className='small-text absolute-center'>{displayNum}</div>
        <Doughnut data={data} options={options}/>
    </div>
  )
}

export default MobileDonutChart