'use client'
import React from 'react'
import { useMatchContext } from '@/contexts/matchContext'
import { useRefContext } from '@/contexts/refContext'
import { portraitURLs } from '@/public/portaitURLMap'
import InfoMapColumn from '@/components/match-info-panel/infoMapColumn'
import InfoRightColumn from '@/components/match-info-panel/infoRightColumn'
import TopPlayerStats from './topPlayerStats'
import BrawlIcons from '../brawlIcons'
import '@/css/matchInfoPanel.css'

const MatchInfoPanel = ({username}) => {
    const { currUsername } = useRefContext();
    const {selectedMatch, focusedStats} = useMatchContext();

    currUsername.current = username;
    return (
        <div className='relative w-full h-full select-none overflow-hidden'>
            <div className='relative w-full h-full p-[2%] grid grid-rows-[2fr_1fr]'>
                <div id='info-panel-main' className='relative min-h-0 w-full h-full'>
                    <div className='relative w-full h-full min-w-0 min-h-0 grid grid-cols-[2fr_3fr] gap-3'>
                        <InfoMapColumn mapName={selectedMatch?.map}/>
                        <InfoRightColumn selected={selectedMatch} focused={focusedStats}/>
                    </div>
                </div>
                <TopPlayerStats username={username} focusedStats={focusedStats} selectedMatch={selectedMatch}/>
            </div>
        </div>
    )
}

export default MatchInfoPanel