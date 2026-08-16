import React from 'react'
import StatsDonutChart from '@/components/match-info-panel/statsDonutChart'

const DonutChartRow = ({selected, focused}) => {
    let brawlerTotalGames = focused?.brawlers_map.wins + focused?.brawlers_map.losses;
    let mapTotalGames = focused?.maps.wins + focused?.maps.losses;
    let brawlerWR = focused?.brawlers_map.wins / brawlerTotalGames;
    let mapWR = focused?.maps.wins / mapTotalGames;
  return (
    <div className='relative grid grid-cols-3 min-h-0'>
        <div className='relative grid grid-rows-[1fr_5fr] h-full'>
            <div className='chart-title text-nowrap'>{selected.map} W/L</div>
            <StatsDonutChart
                stats={[focused?.maps.wins, focused?.maps.losses]}
                colors={['mediumseagreen', 'black']}
                displayNum={`${mapWR.toFixed(2)}`}
            />
        </div>
        <div className='grid grid-rows-[1fr_5fr] h-full'>
            <div className='chart-title text-nowrap'>{selected.brawler} Pickrate</div>
            <StatsDonutChart
                stats={[brawlerTotalGames, mapTotalGames - brawlerTotalGames]}
                colors={['purple','black']}
                displayNum={`${(brawlerTotalGames/mapTotalGames).toFixed(2)}`}
            />
        </div>
        <div className='grid grid-rows-[1fr_5fr] h-full'>
            <div className='chart-title text-nowrap'>{selected.brawler} W/L</div>
            <StatsDonutChart
                stats={[focused?.brawlers_map.wins, focused?.brawlers_map.losses]}
                colors={['orange', 'black']}
                displayNum={`${brawlerWR.toFixed(2)}`}
            />
        </div>
    </div>
  )
}

export default DonutChartRow