import React from 'react'
import BrawlIcons from '@/components/brawlIcons'
import GridSection from '@/components/gridSection'
import { matchURLs, rankedValueToIcon } from '@/public/matchURLMap.js'

const MatchEloInfo = ({selected}) => {
  return (
    <div className='h-full w-full flex justify-evenly overflow-x-auto pt-2 pb-2 gap-3'>
        <div className='h-full aspect-square'>
            <BrawlIcons src={rankedValueToIcon(selected?.rank_value_snapshot)} width= {'90%'} height={`${90*.75}%`} size={'15vw'}/>
        </div>
        <div className='h-full aspect-square grid grid-rows-[30px_1fr]'>
          <GridSection>
            <div className='relative-center text-fit-sm font-bold italic'>ELO Change</div>
          </GridSection>
          <GridSection>
            <div className='relative-center text-fit font-bold italic'>
              {selected?.rankDelta}
            </div>
          </GridSection>
        </div>
        <div className='h-full aspect-square grid grid-rows-[30px_1fr]'>
          <GridSection>
            <div className='relative-center text-fit-sm font-bold italic'>New ELO</div>
          </GridSection>
          <GridSection>
            <div className='relative-center text-fit font-bold italic'>
              {selected?.elo_value_snapshot}
            </div>
          </GridSection>
        </div>
    </div>
  )
}

export default MatchEloInfo