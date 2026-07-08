'use client'
import React from 'react'
import { useMatchContext } from '@/contexts/matchContext'
import { useRefContext } from '@/contexts/refContext'
import InfoMapColumn from '@/components/match-info-panel/infoMapColumn'
import InfoRightColumn from '@/components/match-info-panel/infoRightColumn'
import '@/css/matchInfoPanel.css'

const MatchInfoPanel = ({username}) => {
    const { currUsername } = useRefContext();
    const {selectedMatch, focusedMapStats} = useMatchContext();

    currUsername.current = username;
    return (
        <div className='relative w-full h-full overflow-hidden'>
            <div className='relative w-full h-full p-[2%] grid grid-rows-[2fr_1fr]'>
                <div id='info-panel-main' className='relative min-h-0 w-full h-full'>
                    <div className='relative w-full h-full min-w-0 min-h-0 grid grid-cols-[2fr_3fr] gap-3'>
                        <InfoMapColumn mapName={selectedMatch?.map}/>
                        <InfoRightColumn selected={selectedMatch} focused={focusedMapStats}/>
                    </div>
                </div>
                <div id='stats-section' className='grid grid-cols-[2fr_3fr]'>
                    <div className=''></div>
                </div>
            </div>
        </div>
    )
}

export default MatchInfoPanel