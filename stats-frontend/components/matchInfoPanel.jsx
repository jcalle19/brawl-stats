'use client'
import React from 'react'
import { useMatchContext } from '@/contexts/matchContext'
import {portraitURLs} from '@/public/portaitURLMap.js'
import BrawlIcons from '@/components/brawlIcons'
import '@/css/matchInfoPanel.css'

const MatchInfoPanel = () => {
    const {selectedMatch} = useMatchContext();
    console.log(selectedMatch);
    return (
        <div style={{width: '100%', height: '100%', border: '1px solid green', padding: '10%'}}>
            <div className='grid grid-cols-[2fr_3fr] test-border' style={{width: '100%', height: '100%'}}>
                <div id='info-panel-left-column' className='col-start-1 test-border'>
                    <div>{selectedMatch.brawler}</div>
                    <div>
                        <BrawlIcons src={portraitURLs[selectedMatch.brawler]} width={'80%'} size={'20vw'}/>
                    </div>
                    <div className='grid grid-cols-[1fr_3fr]'>
                        <div className='col-start-1'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.team1?.brawler?.name]} width={'100%'} size={'5vw'}/>
                        </div>
                        <div className='grid grid-rows-2'>
                            <div className='row-start-1'>{selectedMatch?.team1?.name}</div>
                            <div className='row-start-2'>{selectedMatch?.team1?.tag}</div>
                        </div>
                    </div>
                    <div className='grid grid-cols-[1fr_3fr]'>
                        <div className='col-start-1'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.team2?.brawler?.name]} width={'100%'} size={'5vw'}/>
                        </div>
                        <div className='grid grid-rows-2'>
                            <div className='row-start-1'>{selectedMatch?.team2?.name}</div>
                            <div className='row-start-2'>{selectedMatch?.team2?.tag}</div>
                        </div>
                    </div>
                    <div>Enemy Team</div>
                    <div className='grid grid-cols-[1fr_3fr]'>
                        <div className='col-start-1'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.enemy1?.brawler?.name]} width={'100%'} size={'5vw'}/>
                        </div>
                        <div className='grid grid-rows-2'>
                            <div className='row-start-1'>{selectedMatch?.enemy1?.name}</div>
                            <div className='row-start-2'>{selectedMatch?.enemy1?.tag}</div>
                        </div>
                    </div>
                    <div className='grid grid-cols-[1fr_3fr]'>
                        <div className='col-start-1'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.enemy2?.brawler?.name]} width={'100%'} size={'5vw'}/>
                        </div>
                        <div className='grid grid-rows-2'>
                            <div className='row-start-1'>{selectedMatch?.enemy2?.name}</div>
                            <div className='row-start-2'>{selectedMatch?.enemy2?.tag}</div>
                        </div>
                    </div>
                    <div className='grid grid-cols-[1fr_3fr]'>
                        <div className='col-start-1'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.enemy3?.brawler?.name]} width={'100%'} size={'5vw'}/>
                        </div>
                        <div className='grid grid-rows-2'>
                            <div className='row-start-1'>{selectedMatch?.enemy3?.name}</div>
                            <div className='row-start-2'>{selectedMatch?.enemy3?.tag}</div>
                        </div>
                    </div>
                </div>
                <div className='col-start-2 grid grid-rows-[3fr_2fr] test-border'>
                    <div id='map-display' className='row-start-1 test-border'>
                        {selectedMatch?.map}
                    </div>
                    <div className='row-start-2 test-border'></div>
                </div>
            </div>
        </div>
    )
}

export default MatchInfoPanel