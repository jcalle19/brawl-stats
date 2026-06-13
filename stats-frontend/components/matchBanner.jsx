import React from 'react'
import { fetchBrawlerData, fetchMapData } from '@/lib/supabase/browserClient.js'
import { bundledStats } from '@/lib/components/matchFunctions.js'
import '@/css/matchBanner.css'
import { useMatchContext } from '@/contexts/matchContext.jsx';
import {portraitURLs} from '@/public/portaitURLMap.js'
import BrawlIcons from './brawlIcons.jsx'

const MatchBanner = ({matchData}) => {
    const {setSelectedMatch, setFocusedMapStats} = useMatchContext();
    //optimize
    const handleClick = async (matchData) => {
        setSelectedMatch(matchData);
        //brawler stats on map
        let brawlerData = fetchBrawlerData(matchData);
        let mapData = fetchMapData(matchData);
        console.log(brawlerData.data, mapData.data);//, mapError);
        setFocusedMapStats(bundledStats(brawlerData, mapData));
    }
    return (
        <div className='grid grid-rows-[2rem, 2rem, fit-content] match-banner-parent' onClick={()=>handleClick(matchData)}>
            <div className='text-row row-start-1'>
                <div>{matchData.result}</div>
            </div>
            <div className='text-row row-start-2 grid grid-cols-2'>
                <div className='col-start-1'>{matchData?.mode}</div>
                <div className='col-start-2'>{matchData?.map}</div>
            </div>
            <div className='icon-row row-start-3 grid grid-cols-7'>
                <div className='brawler-icon-parent'>
                    <BrawlIcons brawler={matchData?.brawler} player={'self'} src={portraitURLs[matchData?.brawler]} height={'80%'} size={'10vw'}/>
                </div>
                <div className='brawler-icon-parent'>
                    <BrawlIcons brawler={matchData?.team1.brawler.name} player={'team1'} src={portraitURLs[matchData?.team1.brawler.name]} height={'80%'} size={'10vw'}/>
                </div>
                <div className='brawler-icon-parent'>
                    <BrawlIcons brawler={matchData?.team2.brawler.name} player={'team2'} src={portraitURLs[matchData?.team2.brawler.name]} height={'80%'} size={'10vw'}/>
                </div>
                <div>vs.</div>
                <div className='brawler-icon-parent'>
                    <BrawlIcons brawler={matchData?.enemy1.brawler.name} player={'enemy1'} src={portraitURLs[matchData?.enemy1.brawler.name]} height={'80%'} size={'10vw'}/>
                </div>
                <div className='brawler-icon-parent'>
                    <BrawlIcons brawler={matchData?.enemy2.brawler.name} player={'enemy2'} src={portraitURLs[matchData?.enemy2.brawler.name]} height={'80%'} size={'10vw'}/>
                </div>
                <div className='brawler-icon-parent'>
                    <BrawlIcons  brawler={matchData?.enemy3.brawler.name} player={'enemy3'} src={portraitURLs[matchData?.enemy3.brawler.name]} height={'80%'} size={'10vw'}/>
                </div>
            </div>
        </div>
  )
}

export default MatchBanner