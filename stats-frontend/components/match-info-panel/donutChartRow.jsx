import React from 'react'
import StatsDonutChart from '@/components/match-info-panel/statsDonutChart'

const DonutChartRow = ({selected, focused}) => {
  return (
    <div className='relative grid grid-cols-3 min-h-0'>
        <div className='grid grid-rows-[1fr_5fr] h-full'>
            <div className='chart-title text-nowrap'>{selected.map} W/L</div>
            <StatsDonutChart
                stats={[focused.mapWins, focused.mapLosses]}
                colors={['mediumseagreen', 'black']}
                displayNum={`${focused.mapWL.toFixed(2)}`}
            />
        </div>
        <div className='grid grid-rows-[1fr_5fr] h-full'>
            <div className='chart-title text-nowrap'>{selected.brawler} Pickrate</div>
            <StatsDonutChart
                stats={[focused.brawlerTotalGames, focused.mapTotalGames - focused.brawlerTotalGames]}
                colors={['purple','black']}
                displayNum={`${(focused.brawlerTotalGames/focused.mapTotalGames).toFixed(2)}`}
            />
        </div>
        <div className='grid grid-rows-[1fr_5fr] h-full'>
            <div className='chart-title text-nowrap'>{selected.brawler} W/L</div>
            <StatsDonutChart
                stats={[focused.brawlerWins, focused.brawlerLosses]}
                colors={['orange', 'black']}
                displayNum={`${focused.brawlerWL.toFixed(2)}`}
            />
        </div>
    </div>
  )
}

export default DonutChartRow