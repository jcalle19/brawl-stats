import React from 'react'
import StatsDonutChart from '@/components/match-info-panel/statsDonutChart';
const DonutRow = ({focused}) => {
    let brawlerTotalGames = focused?.brawlers_map.wins + focused?.brawlers_map.losses;
    let mapTotalGames = focused?.maps.wins + focused?.maps.losses;
    let brawlerWR = focused?.brawlers_map.wins / brawlerTotalGames;
    let mapWR = focused?.maps.wins / mapTotalGames;
    /*
    <StatsDonutChart
                stats={[focused?.brawlers_map.wins, focused?.brawlers_map.losses]}
                colors={['orange', 'black']}
                displayNum={`${brawlerWR.toFixed(2)}`}
            />
    */
    return (
        <div className='stats-bg h-full w-full flex justify-evenly overflow-x-auto p-2 gap-0'>
            <div className='h-full aspect-square test-border'>
                <StatsDonutChart
                    stats={[focused?.brawlers_map.wins, focused?.brawlers_map.losses]}
                    colors={['orange', 'black']}
                    displayNum={`${brawlerWR.toFixed(2)}`}
                />
            </div>
            <div className='h-full aspect-square test-border'>
                <StatsDonutChart
                    stats={[brawlerTotalGames, mapTotalGames - brawlerTotalGames]}
                    colors={['purple','black']}
                    displayNum={`${(brawlerTotalGames/mapTotalGames).toFixed(2)}`}
                />
            </div>
            <div className='h-full aspect-square test-border'>
                <StatsDonutChart
                    stats={[focused?.maps.wins, focused?.maps.losses]}
                    colors={['mediumseagreen', 'black']}
                    displayNum={`${mapWR.toFixed(2)}`}
                />
            </div>
        </div>
  )
}

export default DonutRow