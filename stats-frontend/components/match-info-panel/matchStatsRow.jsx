import React from 'react'
import BrawlIcons from '@/components/brawlIcons'
import { useRefContext } from '@/contexts/refContext.jsx'
import { matchURLs } from '@/public/matchURLMap.js'
import { portraitURLs } from '@/public/portaitURLMap.js'
import { parse_battle_duration, parse_battle_time } from '@/lib/components/matchFunctions'
import Image from 'next/image'
import '@/css/matchStatsRow.css'

let displayColor;
const MatchStatsRow = ({selected}) => {
    console.log(selected.rankDelta);
    let { currUsername } =  useRefContext();
    displayColor = (selected.result === 'victory' ? 'green' : 'red');
    return (
        <div className='relative w-full h-full min-h-0 grid grid-rows-[1fr_3fr_3fr] pb-5 pr-2 font-bold tracking-wider'>
            <div className='relative w-full h-full grid grid-cols-3 gap-3'>
                <div className={`relative ${displayColor}`}>
                    <Image
                        fill
                        src={matchURLs[selected?.mode]}
                        style={{objectFit: 'contain', transform: 'scale(.9)'}}
                        alt={''}
                        sizes={'10vw'}
                    />
                </div>
                <div className={`${displayColor}`}>
                    <div className='absolute-center font-bold w-fit h-fit text-lg'>{selected?.result}</div>
                </div>
                <div className={`relative`}>
                    <div className='absolute-center w-full h-full grid grid-cols-2 gap-3 text-center'>
                        <div className={`relative ${displayColor}`}>
                            <div className='absolute-center w-fit h-fit'>{parse_battle_time(selected.battle_time)}</div>
                        </div>
                        <div className={`relative ${displayColor}`}>
                            <div className='absolute-center w-fit h-fit'>{parse_battle_duration(selected.duration)}</div>
                        </div> 
                    </div>
                </div>
            </div>
            <div className='relative grid grid-cols-[1fr_4fr] row-start-2 w-full gap-3 pt-5'>
                <div className='relative stats-bg h-full aspect-square overflow-hidden' style={{borderRadius: '5px'}}>
                    <div className='absolute top-0 w-full h-[20%] italic pl-1 green z-100'>{currUsername.current}</div>
                    <BrawlIcons src={portraitURLs[selected?.brawler]} height={'100%'} size={'15vw'}/>
                </div>
                <div className='stats-bg grid grid-cols-4'>
                    <div className='relative grid grid-rows-[1fr_4fr]'>
                        <div className='purple rounded-none pl-1'>Player</div>
                        <div className='player-stat text-base!'>{selected?.player_id}</div>
                    </div>
                    <div className='relative grid grid-rows-[1fr_4fr]'>
                        <div className='red rounded-none pl-1'>Rank</div>
                        <div className='player-stat'>{selected.rank_value_snapshot}</div>
                    </div>
                    <div className='relative grid grid-rows-[1fr_4fr]'>
                        <div className='orange rounded-none pl-1'>ELO Gain</div>
                        <div className='player-stat'>{selected?.rankDelta}</div>
                    </div>
                    <div className='relative grid grid-rows-[1fr_4fr]'>
                        <div className='green rounded-none pl-1'>New ELO</div>
                        <div className='player-stat'>{selected?.elo_value_snapshot}</div>
                    </div>
                </div>
            </div>
            <div className='relative grid grid-cols-5 row-start-3 gap-3 mt-5'>
                <div className='stats-bg aspect-square rounded overflow-hidden team-box'>
                    <BrawlIcons src={portraitURLs[selected?.team1?.brawler.name]} width={'100%'} size={'15vw'}/>
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden team-box'>
                    <BrawlIcons src={portraitURLs[selected?.team2?.brawler.name]} width={'100%'} size={'15vw'}/>
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden enemy-box'>
                    <BrawlIcons src={portraitURLs[selected?.enemy1?.brawler.name]} width={'100%'} size={'15vw'}/>
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden enemy-box'>
                    <BrawlIcons src={portraitURLs[selected?.enemy2?.brawler.name]} width={'100%'} size={'15vw'}/>
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden enemy-box'>
                    <BrawlIcons src={portraitURLs[selected?.enemy3?.brawler.name]} width={'100%'} size={'15vw'}/>
                </div>
            </div>
            
        </div>
    )
}

export default MatchStatsRow