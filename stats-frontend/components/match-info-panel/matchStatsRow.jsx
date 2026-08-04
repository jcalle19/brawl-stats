import { useState } from 'react'
import BrawlIcons from '@/components/brawlIcons'
import ToggleBox from '@/components/match-info-panel/toggleBox'
import { useRefContext } from '@/contexts/refContext.jsx'
import { matchURLs, rankedValueToIcon } from '@/public/matchURLMap.js'
import { portraitURLs } from '@/public/portaitURLMap.js'
import { parse_battle_duration, parse_battle_time } from '@/lib/components/matchFunctions'
import Image from 'next/image'
import '@/css/matchStatsRow.css'

let displayColor;
let portraitSize = '10vw'
let boxToggles = [false,false,false,false,false];

/*
TODO
-Show star player
-split elements into components for readability
*/

const MatchStatsRow = ({selected}) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { currUsername } =  useRefContext();
    displayColor = (selected.result === 'victory' ? 'green' : 'red');

    const handleClick = (index) => {
        console.log(selectedIndex, index);
        selectedIndex !== index ? setSelectedIndex(index) : setSelectedIndex(-1);
    }

    return (
        <div className='relative w-full h-full min-h-0 grid grid-rows-[1fr_3fr_3fr] pt-2 pb-0 pr-2 font-bold tracking-wider'>
            <div className='relative w-full h-full grid grid-cols-3 gap-3'>
                <div className={`relative ${displayColor}`}>
                    <Image
                        fill
                        src={matchURLs[selected?.mode] ? matchURLs[selected?.mode] : '/missing_asset.png'}
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
                            <div className='absolute-center w-fit h-fit'>{parse_battle_time(selected.battle_time).date}</div>
                        </div>
                        <div className={`relative ${displayColor}`}>
                            <div className='absolute-center w-fit h-fit'>{parse_battle_duration(selected.duration)}</div>
                        </div> 
                    </div>
                </div>
            </div>
            <div className='relative grid grid-cols-5 row-start-2 gap-3 mt-5'>
                <div className='relative stats-bg aspect-square grid grid-rows-[1fr_4fr] test-border'>
                    <div className='absolute w-full green rounded-none pl-1 z-100'>{currUsername.current}</div>
                    <BrawlIcons src={portraitURLs[selected?.brawler]} width={'100%'} size={portraitSize}/>
                </div>
                <div className='relative stats-bg aspect-square grid grid-rows-[1fr_4fr]'>
                    <div className='purple rounded-none pl-1'>Player</div>
                    <div className='player-stat text-base!'>{selected?.player_id}</div>
                </div>
                <div className='relative stats-bg aspect-square grid grid-rows-[1fr_4fr]'>
                    <div className='red rounded-none pl-1'>Rank</div>
                    <BrawlIcons src={rankedValueToIcon(selected?.rank_value_snapshot)} width= {'80%'} height={'75%'} size={portraitSize}/>
                </div>
                <div className='relative stats-bg aspect-square grid grid-rows-[1fr_4fr]'>
                    <div className='orange rounded-none pl-1'>ELO Gain</div>
                    <div className='player-stat'>{selected?.rankDelta}</div>
                </div>
                <div className='relative stats-bg aspect-square grid grid-rows-[1fr_4fr]'>
                    <div className='green rounded-none pl-1'>New ELO</div>
                    <div className='player-stat'>{selected?.elo_value_snapshot}</div>
                </div>
            </div>
            <div className='relative grid grid-cols-5 row-start-3 gap-3'>
                <div className='relative stats-bg aspect-square rounded overflow-hidden team-box' onClick={()=>handleClick(0)}>
                    <ToggleBox colorClass={'green'} content={[selected?.team1?.tag, selected?.team1?.name]} 
                        selectedId={selectedIndex} boxId={0}/>
                    <BrawlIcons src={portraitURLs[selected?.team1?.brawler.name]} width={'100%'} size={portraitSize}/>
                </div>
                <div className='relative stats-bg aspect-square rounded overflow-hidden team-box' onClick={()=>handleClick(1)}>
                    <ToggleBox colorClass={'green'} content={[selected?.team2?.tag, selected?.team2?.name]} 
                        selectedId={selectedIndex} boxId={1}/>
                    <BrawlIcons src={portraitURLs[selected?.team2?.brawler.name]} 
                        width={'100%'} size={portraitSize} onClick={()=>{boxToggles[1] = !boxToggles[1]}}
                    />
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden enemy-box' onClick={()=>handleClick(2)}>
                    <ToggleBox colorClass={'red'} content={[selected?.enemy1?.tag, selected?.enemy1?.name]} 
                        selectedId={selectedIndex} boxId={2}/>
                    <BrawlIcons src={portraitURLs[selected?.enemy1?.brawler.name]} 
                        width={'100%'} size={portraitSize} onClick={()=>{boxToggles[2] = !boxToggles[2]}}
                    />
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden enemy-box' onClick={()=>handleClick(3)}>
                    <ToggleBox colorClass={'red'} content={[selected?.enemy2?.tag, selected?.enemy2?.name]} 
                        selectedId={selectedIndex} boxId={3}/>
                    <BrawlIcons src={portraitURLs[selected?.enemy2?.brawler.name]} 
                        width={'100%'} size={portraitSize} onClick={()=>{boxToggles[3] = !boxToggles[3]}}
                    />
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden enemy-box' onClick={()=>handleClick(4)}>
                    <ToggleBox colorClass={'red'} content={[selected?.enemy3?.tag, selected?.enemy3?.name]} 
                        selectedId={selectedIndex} boxId={4}/>
                    <BrawlIcons src={portraitURLs[selected?.enemy3?.brawler.name]} 
                        width={'100%'} size={portraitSize} onClick={()=>{boxToggles[4] = !boxToggles[4]}}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default MatchStatsRow