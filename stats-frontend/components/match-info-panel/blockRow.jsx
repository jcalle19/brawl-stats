import React from 'react'
import BrawlIcons from '@/components/brawlIcons'

//currently unused
const BlockRow = ({cols, content, formatting}) => {
  return (
    <div className={`relative grid grid-cols-${cols} ${formatting}`}>
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
  )
}

export default BlockRow