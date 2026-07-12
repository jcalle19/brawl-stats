import React from 'react'
import { fetchBrawlerData, fetchMapData } from '@/lib/supabase/browserClient.js'
import { bundledStats } from '@/lib/components/matchFunctions.js'
import { useMatchContext } from '@/contexts/matchContext.jsx';
import { portraitURLs } from '@/public/portaitURLMap.js'
import { matchURLs } from '@/public/matchURLMap.js'
import { parse_battle_time } from '@/lib/components/matchFunctions'
import BrawlIcons from './brawlIcons.jsx'
import '@/css/matchBanner.css'

const MatchBanner = ({matchData, rankDelta}) => {
    const {setSelectedMatch, setFocusedMapStats} = useMatchContext();

    const handleClick = async (matchData) => {
        matchData.rankDelta = rankDelta;
        let brawlerData = await fetchBrawlerData(matchData);
        let mapData = await fetchMapData(matchData);
        setSelectedMatch(matchData);
        setFocusedMapStats(bundledStats(brawlerData, mapData));
    }
    
    return (
        <div className='grid grid-rows-[1fr, 3fr] match-banner-parent green font-bold overflow-hidden' onClick={()=>handleClick(matchData)}>
            <div className='text-row row-start-1'>
                <div className={`${matchData.result === 'victory' ? 'green' : 'red'} p-1 rounded-none!`}>{matchData.result}</div>
            </div>
            <div className='row-start-2 grid grid-cols-[1fr_1fr_2fr] min-h-0'>
                <div className='brawler-icon-parent h-full w-full stats-bg'>
                    <BrawlIcons brawler={matchData?.brawler} player={'self'} src={portraitURLs[matchData?.brawler]} width={'100%'} size={'200px'}/>
                </div>
                <div className='h-full pt-1 pb-1' style={{borderRight: '2px solid black'}}>
                    <BrawlIcons src={matchURLs[matchData?.mode]} width={'50%'} overflow={'visible'} size={'200px'}/>
                </div>
                <div className='grid grid-rows-[1fr_2fr]'>
                    <div className='h-full w-full place-content-center'>
                        <div className='grid grid-cols-2'>
                            <div className='h-fit w-full text-center' style={{borderRight: '2px solid black'}}>{parse_battle_time(matchData.battle_time).date}</div>
                            <div className='h-fit w-full text-center'>{parse_battle_time(matchData.battle_time).time}</div>
                        </div>
                    </div>
                    <div className='h-full w-full place-content-center' style={{borderTop: '2px solid black'}}>
                        <div className='h-fit w-full text-center italic'>{matchData?.map}</div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MatchBanner