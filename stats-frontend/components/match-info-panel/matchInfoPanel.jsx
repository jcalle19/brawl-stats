'use client'
import React from 'react'
import { useMatchContext } from '@/contexts/matchContext'
import InfoMapColumn from '@/components/match-info-panel/infoMapColumn'
import InfoRightColumn from '@/components/match-info-panel/infoRightColumn'
import TopPlayerStats from './topPlayerStats'
import '@/css/matchInfoPanel.css'

const MatchInfoPanel = ({username}) => {
    const {selectedMatch, focusedStats} = useMatchContext();
    
    return (
        <div className='relative w-full h-full select-none'>
            <div className='relative w-full h-full p-[2%] grid grid-rows-[2fr_1fr]'>
                <div id='info-panel-main' className='relative min-h-0 w-full h-full pl-5 pr-5'>
                    <div className='relative w-full h-full min-w-0 min-h-0 grid grid-cols-[3fr_2fr] gap-3' style={{border: '5px dashed green'}}>
                        <InfoRightColumn selected={selectedMatch} focused={focusedStats}/>
                        <InfoMapColumn mapName={selectedMatch?.map}/>
                    </div>
                </div>
                <TopPlayerStats username={username} focusedStats={focusedStats} selectedMatch={selectedMatch}/>
            </div>
        </div>
    )
}

export default MatchInfoPanel