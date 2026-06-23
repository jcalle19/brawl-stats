'use client'
import React from 'react'
import { useMatchContext } from '@/contexts/matchContext'
import { portraitURLs } from '@/public/portaitURLMap.js'
import BrawlIcons from '@/components/brawlIcons'
import InfoMapColumn from '@/components/match-info-panel/infoMapColumn'
import InfoRightColumn from '@/components/match-info-panel/infoRightColumn'
import StatsPieChart from '@/components/match-info-panel/statsPieChart'
import '@/css/matchInfoPanel.css'

const MatchInfoPanel = () => {
    const {selectedMatch, focusedMapStats} = useMatchContext();

    return (
        <div className='relative w-full h-full overflow-hidden'>
            <div className='relative w-full h-full p-[2%] grid grid-rows-[2fr_1fr]'>
                <div id='info-panel-main' className='relative min-h-0 w-full h-full grid grid-cols-[1fr_8fr]'>
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
                    <div className='relative w-full h-full min-w-0 min-h-0 grid grid-cols-[2fr_3fr]'>
                        <InfoMapColumn mapName={selectedMatch?.map}/>
                        <InfoRightColumn selected={selectedMatch} focused={focusedMapStats}/>
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