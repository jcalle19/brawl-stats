'use client'
import {useState} from 'react'
import {portraitURLs} from '@/public/portaitURLMap.js'
import { matchURLs } from '@/public/matchURLMap'
import { calc_display_stats } from '@/lib/components/matchFunctions'
import { useMatchContext } from '@/contexts/matchContext'
import ToggleBox from '@/components/match-info-panel/toggleBox'
import InfoMapColumn from '../match-info-panel/infoMapColumn'
import MobileMenuBanner from './mobileMenuBanner'
import MobileRankRow from './mobileRankRow'
import MobileDonutRow from './mobileDonutRow'
import Image from 'next/image'
import BrawlIcons from '../brawlIcons'

const MobileInfoColumns = () => {
    const {selectedMatch, focusedStats} = useMatchContext();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const stats = calc_display_stats(focusedStats);
    const displayColor = (selectedMatch.result === 'victory' ? 'green' : 'red');
    let portraitSize = '10vw'
    let boxToggles = [false,false,false,false,false];

    const handleClick = (index) => {
        console.log(selectedIndex, index);
        selectedIndex !== index ? setSelectedIndex(index) : setSelectedIndex(-1);
    }
  return (
    <div className='relative w-full h-full min-h-0 overflow-y-scroll'>
        <MobileMenuBanner/>
        <div className='relative h-[150%] top-[55px] grid grid-rows-[1fr_1fr_[0px]_3fr_1fr_1fr]' style={{border: '1px solid blue'}}>
            <div id='brawler-row' className='grid grid-cols-[1fr_2fr]'>
                <div className='w-full aspect-square'>
                    <BrawlIcons src={portraitURLs[selectedMatch?.brawler]} width={'100%'} size={'5vw'}/>
                </div>
                <div className='grid grid-rows-2'>
                    <div className={`relative ${displayColor}`}>
                        <div className='absolute-center font-bold w-fit h-fit text-lg'>{selectedMatch?.result}</div>
                    </div>
                    <div className={`relative ${displayColor}`}>
                        <Image
                            fill
                            src={matchURLs[selectedMatch?.mode] ? matchURLs[selectedMatch?.mode] : '/missing_asset.png'}
                            style={{objectFit: 'contain', transform: 'scale(.9)'}}
                            alt={''}
                            sizes={'10vw'}
                        />
                    </div>
                </div>
            </div>
            <MobileRankRow selected={selectedMatch}/>
            <MobileDonutRow selected={selectedMatch} focused={focusedStats}/>
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='relative-center grid grid-rows-5 h-fit gap-2'>
                    <div className='relative stats-bg aspect-square rounded overflow-hidden team-box' onClick={()=>handleClick(0)}>
                        <ToggleBox colorClass={'green'} content={[selectedMatch?.team1?.tag, selectedMatch?.team1?.name]} 
                            selectedId={selectedIndex} boxId={0}/>
                        <BrawlIcons src={portraitURLs[selectedMatch?.team1?.brawler.name]} width={'100%'} size={portraitSize}/>
                    </div>
                    <div className='relative stats-bg aspect-square rounded overflow-hidden team-box' onClick={()=>handleClick(1)}>
                        <ToggleBox colorClass={'green'} content={[selectedMatch?.team2?.tag, selectedMatch?.team2?.name]} 
                            selectedId={selectedIndex} boxId={1}/>
                        <BrawlIcons src={portraitURLs[selectedMatch?.team2?.brawler.name]} 
                            width={'100%'} size={portraitSize} onClick={()=>{boxToggles[1] = !boxToggles[1]}}
                        />
                    </div>
                    <div className='stats-bg aspect-square rounded overflow-hidden enemy-box' onClick={()=>handleClick(2)}>
                        <ToggleBox colorClass={'red'} content={[selectedMatch?.enemy1?.tag, selectedMatch?.enemy1?.name]} 
                            selectedId={selectedIndex} boxId={2}/>
                        <BrawlIcons src={portraitURLs[selectedMatch?.enemy1?.brawler.name]} 
                            width={'100%'} size={portraitSize} onClick={()=>{boxToggles[2] = !boxToggles[2]}}
                        />
                    </div>
                    <div className='stats-bg aspect-square rounded overflow-hidden enemy-box' onClick={()=>handleClick(3)}>
                        <ToggleBox colorClass={'red'} content={[selectedMatch?.enemy2?.tag, selectedMatch?.enemy2?.name]} 
                            selectedId={selectedIndex} boxId={3}/>
                        <BrawlIcons src={portraitURLs[selectedMatch?.enemy2?.brawler.name]} 
                            width={'100%'} size={portraitSize} onClick={()=>{boxToggles[3] = !boxToggles[3]}}
                        />
                    </div>
                    <div className='stats-bg aspect-square rounded overflow-hidden enemy-box' onClick={()=>handleClick(4)}>
                        <ToggleBox colorClass={'red'} content={[selectedMatch?.enemy3?.tag, selectedMatch?.enemy3?.name]} 
                            selectedId={selectedIndex} boxId={4}/>
                        <BrawlIcons src={portraitURLs[selectedMatch?.enemy3?.brawler.name]} 
                            width={'100%'} size={portraitSize} onClick={()=>{boxToggles[4] = !boxToggles[4]}}
                        />
                    </div>
                </div>
                <div>
                    <InfoMapColumn mapName={selectedMatch?.map}/>
                </div>
            </div>
            <div className='grid grid-cols-[40px_4fr]'>
                <div className='striped-bg h-full w-full grid grid-rows-[1fr_3fr_3fr]'>
                    <div className='purple'></div>
                    <div className='relative-center small-text font-bold' style={{writingMode: 'sideways-lr'}}>Top 500</div>
                    <div className='relative-center small-text font-bold' style={{writingMode: 'sideways-lr'}}>Kriby</div>
                </div>
                <div className='h-full w-full grid grid-rows-[1fr_3fr_3fr]' style={{backgroundColor: 'green'}}>
                    <div className='purple grid grid-cols-4'>
                        <div className='relative-center small-text font-bold'>W/L (Map)</div>
                        <div className='relative-center small-text font-bold'>Pick % (Map)</div>
                        <div className='relative-center small-text font-bold'>W/L (Mode)</div>
                        <div className='relative-center small-text font-bold'>Pick % (Mode)</div>
                    </div>
                    <div className='stats-bg relative grid grid-cols-4' style={{borderBottom: '1px solid purple'}}>
                        <div className='relative-center small-text font-bold italic'>
                            {focusedStats?.top_map_winrate ? focusedStats.top_map_winrate.toFixed(2) : '0.00'}
                        </div>
                        <div className='relative-center small-text font-bold italic'>
                            {focusedStats?.top_map_pickrate ? focusedStats?.top_map_pickrate?.toFixed(2) : '0.00'}
                        </div>
                        <div className='relative-center small-text font-bold italic'>
                            {focusedStats?.top_mode_winrate ? focusedStats?.top_mode_winrate?.toFixed(2) : '0.00'}
                        </div>
                        <div className='relative-center small-text font-bold italic'>
                            {focusedStats?.top_mode_pickrate ? focusedStats?.top_mode_pickrate?.toFixed(2) : '0.00'}
                        </div>
                    </div>
                    <div className='stats-bg relative grid grid-cols-4' style={{backgroundColor: 'orange'}}>
                        <div className='relative-center small-text font-bold italic' 
                            style={{color: `${stats.statColor.mapWLGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{stats.selectedMapWL.toFixed(2)}</div>
                        <div className='relative-center small-text font-bold italic'
                            style={{color: `${stats.statColor.mapPickGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{stats.selectedMapPick.toFixed(2)}</div>
                        <div className='relative-center small-text font-bold italic'
                            style={{color: `${stats.statColor.modeWLGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{stats.selectedModeWL.toFixed(2)}</div>
                        <div className='relative-center small-text font-bold italic'
                            style={{color: `${stats.statColor.modePickGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{stats.selectedModePick.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-[1fr_2fr]'>
                <div className='h-full w-full grid grid-rows-[1fr_6fr]' style={{borderLeft: '1px solid purple'}}>
                    <div className='purple'>
                        <div className='relative-center small-text font-bold'>Stat Δ</div>
                    </div>
                    <div className='relative-center small-text font-bold italic'
                        style={{color: `${stats.statColor.deltaGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>
                        {stats.delta.toFixed(2) > 0 ? '+' : ''}{stats.delta.toFixed(2)}
                    </div>
                </div>
                <div className='h-full w-full grid grid-rows-[1fr_6fr]' style={{borderLeft: '1px solid purple'}}>
                    <div className='purple'>
                        <div className='relative-center small-text font-bold'>Grade</div>
                    </div>
                    <div className='relative-center huge-text font-bold italic'>{stats.grade}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MobileInfoColumns