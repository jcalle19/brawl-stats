import React from 'react'
import BrawlIcons from '../brawlIcons'
import Image from 'next/image'
import { rankedValueToIcon } from '@/public/matchURLMap.js'

const MobileRankRow = ({selected}) => {
  return (
    <div className='relative grid grid-rows-[1fr_6fr]'>
        <div className='purple grid grid-cols-4'>
            <div className='relative-center small-text'>Player</div>
            <div className='relative-center small-text'>Rank</div>
            <div className='relative-center small-text'>ELO Gain</div>
            <div className='relative-center small-text'>New ELO</div>
        </div>
        <div className='grid grid-cols-4'>
            <div className='relative-center small-text'>{selected?.player_id}</div>
            <div className='relative'>
                <Image
                    fill
                    src={rankedValueToIcon(selected?.rank_value_snapshot) ? rankedValueToIcon(selected?.rank_value_snapshot) : '/missing_asset.png'}
                    style={{objectFit: 'contain', transform: 'scale(.9)'}}
                    alt={''}
                    sizes={'10vw'}
                />
            </div>
            <div className='relative-center small-text'>{selected?.rankDelta}</div>
            <div className='relative-center small-text'>{selected?.elo_value_snapshot}</div>
        </div>
    </div>
  )
}

export default MobileRankRow