import React from 'react'
import BrawlIcons from '@/components/brawlIcons'
import { matchURLs, rankedValueToIcon } from '@/public/matchURLMap.js'

const MatchEloInfo = ({selected}) => {
  return (
    <div className='purple h-full w-full flex justify-evenly overflow-x-auto pt-5 pb-5 gap-3'>
        <div className='h-full aspect-square test-border'>
            <BrawlIcons src={rankedValueToIcon(selected?.rank_value_snapshot)} width= {'90%'} height={`${90*.75}%`} size={'15vw'}/>
        </div>
        <div className='h-full aspect-square test-border'>{selected?.rankDelta}</div>
        <div className='h-full aspect-square test-border'>{selected?.elo_value_snapshot}</div>
    </div>
  )
}

export default MatchEloInfo