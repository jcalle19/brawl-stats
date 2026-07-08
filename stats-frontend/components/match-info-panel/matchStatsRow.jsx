import { useState } from 'react'
import BrawlIcons from '@/components/brawlIcons'
import { useRefContext } from '@/contexts/refContext.jsx'
import { matchURLs, rankedValueToIcon } from '@/public/matchURLMap.js'
import { portraitURLs } from '@/public/portaitURLMap.js'
import { parse_battle_duration, parse_battle_time } from '@/lib/components/matchFunctions'
import Image from 'next/image'
import '@/css/matchStatsRow.css'

let displayColor;
let portraitSize = '5vw'
let boxToggles = [false,false,false,false,false];
/* 
<div className='relative grid grid-cols-[1fr_4fr] row-start-2 w-full gap-3 pt-5 overflow-hidden test-border'>
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

            <div className='relative grid grid-cols-5 row-start-2 gap-3 mt-5 test-border'>
                <div className='relative grid grid-rows-[1fr_4fr]'>
                    <div className='green rounded-none pl-1'>{currUsername.current}</div>
                    <BrawlIcons src={portraitURLs[selected?.brawler]} width={'100%'} size={'15vw'}/>
                </div>
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
                            <div className='absolute-center w-fit h-fit'>{parse_battle_time(selected.battle_time)}</div>
                        </div>
                        <div className={`relative ${displayColor}`}>
                            <div className='absolute-center w-fit h-fit'>{parse_battle_duration(selected.duration)}</div>
                        </div> 
                    </div>
                </div>
            </div>
            <div className='relative grid grid-cols-5 row-start-2 gap-3 mt-5'>
                <div className='relative stats-bg aspect-square grid grid-rows-[1fr_4fr]'>
                    <div className='absolute w-full green rounded-none pl-1 z-100'>{currUsername.current}</div>
                    <BrawlIcons src={portraitURLs[selected?.brawler]} width={'100%'} size={portraitSize}/>
                </div>
                <div className='relative stats-bg aspect-square grid grid-rows-[1fr_4fr] test-border'>
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
                    <div className={`green identity-box transition-transform duration-300 ${selectedIndex === 0 ? 'scale-100!' : 'scale-0!'}`}></div>
                    <BrawlIcons src={portraitURLs[selected?.team1?.brawler.name]} width={'100%'} size={portraitSize}/>
                </div>
                <div className='relative stats-bg aspect-square rounded overflow-hidden team-box' onClick={()=>handleClick(1)}>
                    <div className={`green identity-box transition-transform duration-300 ${selectedIndex === 1 ? 'scale-100!' : 'scale-0!'}`}></div>
                    <BrawlIcons src={portraitURLs[selected?.team2?.brawler.name]} 
                        width={'100%'} size={portraitSize} onClick={()=>{boxToggles[1] = !boxToggles[1]}}
                    />
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden enemy-box' onClick={()=>handleClick(2)}>
                    <div className={`red identity-box transition-transform duration-300 ${selectedIndex === 2 ? 'scale-100!' : 'scale-0!'}`}></div>
                    <BrawlIcons src={portraitURLs[selected?.enemy1?.brawler.name]} 
                        width={'100%'} size={portraitSize} onClick={()=>{boxToggles[2] = !boxToggles[2]}}
                    />
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden enemy-box' onClick={()=>handleClick(3)}>
                    <div className={`red identity-box transition-transform duration-300 ${selectedIndex === 3 ? 'scale-100!' : 'scale-0!'}`}></div>
                    <BrawlIcons src={portraitURLs[selected?.enemy2?.brawler.name]} 
                        width={'100%'} size={portraitSize} onClick={()=>{boxToggles[3] = !boxToggles[3]}}
                    />
                </div>
                <div className='stats-bg aspect-square rounded overflow-hidden enemy-box' onClick={()=>handleClick(4)}>
                    <div className={`red identity-box transition-transform duration-300 ${selectedIndex === 4 ? 'scale-100!' : 'scale-0!'}`}></div>
                    <BrawlIcons src={portraitURLs[selected?.enemy3?.brawler.name]} 
                        width={'100%'} size={portraitSize} onClick={()=>{boxToggles[4] = !boxToggles[4]}}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default MatchStatsRow