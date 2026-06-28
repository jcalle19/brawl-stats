import React from 'react'
import BrawlIcons from '@/components/brawlIcons'
import { matchURLs } from '@/public/matchURLMap.js'
import { portraitURLs } from '@/public/portaitURLMap.js'
import { parse_battle_duration, parse_battle_time } from '@/lib/components/matchFunctions'
import Image from 'next/image'
import '@/css/matchStatsRow.css'

let displayColor;
const MatchStatsRow = ({selected}) => {
    displayColor = (selected.result === 'victory' ? 'green' : 'red');
    //date, duration, result, rank, elo change, mode
    console.log(parse_battle_duration(selected.duration))//parse_battle_time(selected.battle_time));
    return (
        <div className='relative w-full h-full min-h-0 grid grid-rows-[1fr_2fr_2fr] pt-5 pb-5 pr-2 font-bold tracking-wider'>
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
            <div className='relative grid grid-cols-5 gap-3 mt-5'>
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
            <div className='grid grid-cols-1 gap-3'>
                <div className='stats-bg mt-5'>4</div>
            </div>
        </div>
    )
}

export default MatchStatsRow