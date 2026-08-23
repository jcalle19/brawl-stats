'use client'
import { useState } from 'react'
import BrawlIcons from '@/components/brawlIcons'
import ToggleBox from '@/components/match-info-panel/toggleBox'
import { portraitURLs } from '@/public/portaitURLMap.js'
import '@/css/matchStatsRow.css'

let displayColor;
let portraitSize = '200px'
let boxToggles = [false,false,false,false,false];

const PlayerRow = ({selected}) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const commonTraits = 'h-full min-h-[100px] shrink-0 aspect-square rounded-[5px] overflow-hidden test-border'

    const handleClick = (index) => {
        console.log(selectedIndex, index);
        selectedIndex !== index ? setSelectedIndex(index) : setSelectedIndex(-1);
    }

  return (
    <div className='stats-bg w-full md:flex md:justify-center md:overflow-x-auto grid grid-cols-3 grid-rows-3 gap-2 p-4 md:p-2 test-border'>
        <div className={`${commonTraits}`}>
            <BrawlIcons src={portraitURLs[selected?.brawler]} width={'100%'} size={portraitSize}/>
        </div>
        <div className={`${commonTraits} team-box`} onClick={()=>handleClick(0)}>
            <ToggleBox colorClass={'green'} content={[selected?.team1?.tag, selected?.team1?.name]} 
                selectedId={selectedIndex} boxId={0}/>
            <BrawlIcons src={portraitURLs[selected?.team1?.brawler.name]} width={'100%'} size={portraitSize}/>
        </div>
        <div className={`${commonTraits} team-box`} onClick={()=>handleClick(1)}>
            <ToggleBox colorClass={'green'} content={[selected?.team2?.tag, selected?.team2?.name]} 
                selectedId={selectedIndex} boxId={1}/>
            <BrawlIcons src={portraitURLs[selected?.team2?.brawler.name]} 
                width={'100%'} size={portraitSize} onClick={()=>{boxToggles[1] = !boxToggles[1]}}/>
        </div>
        <div className={commonTraits}>
            <div className='relative-center text-fit'>vs</div>
        </div>
        <div className={`${commonTraits} enemy-box`} onClick={()=>handleClick(2)}>
            <ToggleBox colorClass={'red'} content={[selected?.enemy1?.tag, selected?.enemy1?.name]} 
                selectedId={selectedIndex} boxId={2}/>
            <BrawlIcons src={portraitURLs[selected?.enemy1?.brawler.name]} 
                width={'100%'} size={portraitSize} onClick={()=>{boxToggles[2] = !boxToggles[2]}}/>
        </div>
        <div className={`${commonTraits} enemy-box`} onClick={()=>handleClick(3)}>
            <ToggleBox colorClass={'red'} content={[selected?.enemy2?.tag, selected?.enemy2?.name]} 
                selectedId={selectedIndex} boxId={3}/>
            <BrawlIcons src={portraitURLs[selected?.enemy2?.brawler.name]} 
                width={'100%'} size={portraitSize} onClick={()=>{boxToggles[3] = !boxToggles[3]}}/>
        </div>
        <div className={`${commonTraits} enemy-box`} onClick={()=>handleClick(4)}>
            <ToggleBox colorClass={'red'} content={[selected?.enemy3?.tag, selected?.enemy3?.name]} 
                selectedId={selectedIndex} boxId={4}/>
            <BrawlIcons src={portraitURLs[selected?.enemy3?.brawler.name]} 
                width={'100%'} size={portraitSize} onClick={()=>{boxToggles[4] = !boxToggles[4]}}/>
        </div>
    </div>
  )
}

export default PlayerRow