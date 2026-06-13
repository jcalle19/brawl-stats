'use client'
import React from 'react'
import { useMatchContext } from '@/contexts/matchContext'
import {portraitURLs} from '@/public/portaitURLMap.js'
import BrawlIcons from '@/components/brawlIcons'
import PlayerBrawlerTag from '@/components/match-info-panel/playerBrawlerTag'
import '@/css/matchInfoPanel.css'

const MatchInfoPanel = () => {
    const {selectedMatch, focusedMapStats} = useMatchContext();
    return (
        <div style={{width: '100%', height: '100%', border: '1px solid green', padding: '10%'}}>
            <div className='grid grid-cols-[2fr_3fr] test-border' style={{width: '100%', height: '100%'}}>
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
                <div className='col-start-2 grid grid-rows-[3fr_2fr] test-border'>
                    <div id='map-display' className='row-start-1 test-border'>
                        {selectedMatch?.map}
                    </div>
                    <div className='row-start-2 grid grid-rows-4 test-border'>
                        <div>{selectedMatch?.map} stats</div>
                        <div className='grid grid-cols-2'>
                            <div>Win %</div> 
                            <div>{100*focusedMapStats.mapWL}%</div>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div>Play % as {selectedMatch?.brawler}</div>
                            <div>{100*(focusedMapStats.brawlerTotalGames / focusedMapStats.mapTotalGames)}%</div>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div>Win % as {selectedMatch?.brawler}</div>
                            <div>{100*focusedMapStats.brawlerWL}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchInfoPanel