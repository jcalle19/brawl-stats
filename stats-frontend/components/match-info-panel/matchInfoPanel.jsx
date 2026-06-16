'use client'
import React from 'react'
import { useMatchContext } from '@/contexts/matchContext'
import { portraitURLs } from '@/public/portaitURLMap.js'
import BrawlIcons from '@/components/brawlIcons'
import MapBase from '@/components/map-parts/mapBase'
import StatsPieChart from '@/components/match-info-panel/statsPieChart'
import '@/css/matchInfoPanel.css'

const MatchInfoPanel = () => {
    const {selectedMatch, focusedMapStats} = useMatchContext();
    
    /*
    <div style={{position: 'relative', width: '100%', height: '100%', border: '1px solid green'}}>
            <div className='grid grid-rows-[4fr_1fr] test-border' style={{width: '100%', height: '100%'}}>
                <div className='grid row-start-1 grid-cols-[2fr_3fr] test-border' style={{width: '100%', height: '100%'}}>
                    <div id='info-panel-left-column' className='col-start-1 test-border'>
                        <div>{selectedMatch.brawler}</div>
                        <div>
                            <BrawlIcons src={portraitURLs[selectedMatch.brawler]} width={'80%'} size={'20vw'}/>
                        </div>
                        <PlayerBrawlerTag player={selectedMatch?.team1}/>
                        <PlayerBrawlerTag player={selectedMatch?.team2}/>
                        <div>Enemy Team</div>
                        <PlayerBrawlerTag player={selectedMatch?.enemy1}/>
                        <PlayerBrawlerTag player={selectedMatch?.enemy2}/>
                        <PlayerBrawlerTag player={selectedMatch?.enemy3}/>
                    </div>
                    <div className='col-start-2 test-border' style={{position: 'relative'}}>
                        <div id='map-display' className='row-start-1 test-border'>
                            {selectedMatch?.map}
                        </div>
                    </div>
                </div>
                <div id='stats-section' className='grid row-start-2 grid-cols-3 test-border' style={{height: '100%'}}>
                    <StatsPieChart label={'W/L (Map)'} winPercentage={360*focusedMapStats.mapWL}/>
                    <StatsPieChart label={`Pickrate (Brawler)`} winPercentage={360*(focusedMapStats.brawlerTotalGames / focusedMapStats.mapTotalGames)}/>
                    <StatsPieChart label={`W/L (Brawler)`} winPercentage={360*focusedMapStats.brawlerWL}/>
                </div>
            </div>
    */
    return (
        <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
            <div className='grid grid-rows-[2fr_1fr]' style={{width: '100%', height: '100%', padding: '2%'}}>
                <div id='info-panel-main' className='min-h-0 grid grid-cols-[1fr_8fr]' style={{width: '100%', height: '100%'}}>
                    <div id='info-panel-players' className='min-h-0 w-full h-full grid grid-rows-[auto_1fr_1fr_1fr_1fr_1fr]'>
                        <div>
                            <BrawlIcons src={portraitURLs[selectedMatch.brawler]} width={'100%'} size={'20vw'}/>
                        </div>
                        <div className='player-portrait'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.team1?.brawler.name]} width={'100%'} size={'15vw'}/>
                        </div>
                        <div className='player-portrait'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.team2?.brawler.name]} width={'100%'} size={'15vw'}/>
                        </div>
                        <div className='player-portrait'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.enemy1?.brawler.name]} width={'100%'} size={'15vw'}/>
                        </div>
                        <div className='player-portrait'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.enemy2?.brawler.name]} width={'100%'} size={'15vw'}/>
                        </div>
                        <div className='player-portrait'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.enemy3?.brawler.name]} width={'100%'} size={'15vw'}/>
                        </div>
                    </div>
                    <div className='test-border' style={{position: 'relative'}}>
                        <MapBase/>
                    </div>
                </div>
                <div id='stats-section' className='grid grid-cols-[3fr_2fr]'>
                    <div className='min-h-0 w-full h-full grid grid-cols-3'>
                        <StatsPieChart label={'W/L (Map)'} winPercentage={360*focusedMapStats.mapWL}/>
                        <StatsPieChart label={`Pickrate (Brawler)`} winPercentage={360*(focusedMapStats.brawlerTotalGames / focusedMapStats.mapTotalGames)}/>
                        <StatsPieChart label={`W/L (Brawler)`} winPercentage={360*focusedMapStats.brawlerWL}/>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default MatchInfoPanel