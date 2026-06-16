import React from 'react'
import '@/css/matchInfoPanel.css'

const StatsPieChart = ({label, winPercentage}) => {
  return (
    <div>
        <div className='stats-chart-container'>
             <div className='pie-chart' style={{
                    background: `conic-gradient(
                                 lightgreen, lightgreen ${winPercentage}deg,
                                 rgb(255, 50, 50) ${winPercentage}deg,
                                 rgb(255, 50, 50) 360deg`
                }}>
            </div>
        </div>
    </div>
  )
}

export default StatsPieChart