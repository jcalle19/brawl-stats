'use client'
import React from 'react'
import { useMatchContext } from '@/contexts/matchContext'
import { portraitURLs } from '@/public/portaitURLMap.js'
import BrawlIcons from '@/components/brawlIcons'
import MapBase from '@/components/map-parts/mapBase'
import StatsPieChart from '@/components/match-info-panel/statsPieChart'
import StatsDonutChart from '@/components/match-info-panel/statsDonutChart'
import '@/css/matchInfoPanel.css'

const MatchInfoPanel = () => {
    const {selectedMatch, focusedMapStats} = useMatchContext();
    console.log(focusedMapStats);
    /*
    <div className='grid grid-rows-[1fr_5fr]'>
                                    <div className='chart-title'>{selectedMatch?.map} W/L</div>
                                    <StatsDonutChart
                                        stats={[focusedMapStats.mapWins, focusedMapStats.mapLosses]}
                                        colors={['#80EF80', 'red']}
                                    />
                                </div>
                                <div className='grid grid-rows-[1fr_5fr]'>
                                    <div className='chart-title'>{selectedMatch?.brawler} Pickrate</div>
                                    <StatsDonutChart
                                        stats={[focusedMapStats.brawlerTotalGames, focusedMapStats.mapTotalGames - focusedMapStats.brawlerTotalGames]}
                                        colors={['purple','black']}
                                    />
                                </div>
                                <div className='grid grid-rows-[1fr_5fr]'>
                                    <div className='chart-title'>{selectedMatch?.brawler} W/L</div>
                                    <StatsDonutChart
                                        stats={[focusedMapStats.brawlerWins, focusedMapStats.brawlerLosses]}
                                        colors={['orange', 'black']}
                                    />
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
                    <div className='grid grid-cols-[2fr_3fr] relative w-full h-full min-w-0 min-h-0'>
                        <div className='relative'>
                            <div id='map-container' className='col-start-1 striped-bg'>
                                <div id='map-banner'>
                                    <div id='map-banner-text'>{selectedMatch?.map}</div>
                                </div>
                                <MapBase/>
                            </div>
                        </div>
                        <div className='grid grid-rows-[1fr_3fr] relative w-full h-full min-w-0 min-h-0 '>
                            <div className='grid grid-cols-3 max-h-full pt-5'>
                                <div className='grid grid-rows-[1fr_5fr] max-h-full'>
                                    <div className='chart-title'>{selectedMatch?.map} W/L</div>
                                    <StatsDonutChart
                                        stats={[focusedMapStats.mapWins, focusedMapStats.mapLosses]}
                                        colors={['mediumseagreen', 'black']}
                                        displayNum={`${focusedMapStats.mapWL.toFixed(2)}`}
                                    />
                                </div>
                                <div className='grid grid-rows-[1fr_5fr] max-h-full'>
                                    <div className='chart-title'>{selectedMatch?.brawler} Pickrate</div>
                                    <StatsDonutChart
                                        stats={[focusedMapStats.brawlerTotalGames, focusedMapStats.mapTotalGames - focusedMapStats.brawlerTotalGames]}
                                        colors={['purple','black']}
                                        displayNum={`${(focusedMapStats.brawlerTotalGames/focusedMapStats.mapTotalGames).toFixed(2)}`}
                                    />
                                </div>
                                <div className='grid grid-rows-[1fr_5fr] max-h-full'>
                                    <div className='chart-title'>{selectedMatch?.brawler} W/L</div>
                                    <StatsDonutChart
                                        stats={[focusedMapStats.brawlerWins, focusedMapStats.brawlerLosses]}
                                        colors={['orange', 'black']}
                                        displayNum={`${focusedMapStats.brawlerWL.toFixed(2)}`}
                                    />
                                </div>
                            </div>
                            <div className='w-full h-full test-border'>hi</div>
                        </div>
                    </div>
                </div>
                <div id='stats-section' className='grid grid-cols-[3fr_2fr] striped-bg'>
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