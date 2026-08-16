import React from 'react'
import MobileDonutChart from './mobileDonutChart';
const MobileDonutRow = ({selected, focused}) => {
    let brawlerTotalGames = focused?.brawlers_map.wins + focused?.brawlers_map.losses;
    let mapTotalGames = focused?.maps.wins + focused?.maps.losses;
    let brawlerWR = focused?.brawlers_map.wins / brawlerTotalGames;
    let mapWR = focused?.maps.wins / mapTotalGames;

    return (
        <div className='grid grid-rows-[1fr_6fr] max-h-fit'>
            <div className='purple grid grid-cols-3'>
                <div className='relative-center small-text text-nowrap'>{selected.map} W/L</div>
                <div className='relative-center small-text text-nowrap'>{selected.brawler} Pickrate</div>
                <div className='relative-center small-text text-nowrap'>{selected.brawler} W/L</div>
            </div>
            <div className='grid grid-cols-3 min-h-0'>
                <div className='aspect-square'>
                    <MobileDonutChart 
                        stats={[focused?.maps.wins, focused?.maps.losses]}
                        colors={['mediumseagreen', 'black']}
                        displayNum={`${mapWR.toFixed(2)}`}/>
                </div>
                <div className='aspect-square'>
                    <MobileDonutChart 
                        stats={[brawlerTotalGames, mapTotalGames - brawlerTotalGames]}
                        colors={['purple','black']}
                        displayNum={`${(brawlerTotalGames/mapTotalGames).toFixed(2)}`}/>
                </div>
                <div className='aspect-square'>
                    <MobileDonutChart 
                        stats={[focused?.brawlers_map.wins, focused?.brawlers_map.losses]}
                        colors={['orange', 'black']}
                        displayNum={`${brawlerWR.toFixed(2)}`}/>
                </div>
            </div>
        </div>
        
    )
}

export default MobileDonutRow