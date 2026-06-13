'use client'
import React from 'react'
import {portraitURLs} from '@/public/portaitURLMap.js'
import BrawlIcons from '@/components/brawlIcons'
import '@/css/matchInfoPanel.css'

const PlayerBrawlerTag = ({player}) => {
  return (
    <div className='grid grid-cols-[1fr_3fr]'>
        <div className='col-start-1'>
            <BrawlIcons src={portraitURLs[player?.brawler?.name]} width={'100%'} size={'5vw'}/>
        </div>
        <div className='grid grid-rows-2'>
            <div className='row-start-1'>{player?.name}</div>
            <div className='row-start-2'>{player?.tag}</div>
        </div>
    </div>
  )
}

export default PlayerBrawlerTag