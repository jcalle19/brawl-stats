import React from 'react'
import { matchURLs } from '@/public/matchURLMap.js'
import { parse_battle_duration, parse_battle_time } from '@/lib/components/matchFunctions'
import GridSection from '@/components/gridSection'
import Image from 'next/image'

let displayColor;
const MatchInfoRow = ({selected}) => {
    displayColor = (selected?.result === 'victory' ? 'green' : 'red');
    console.log(selected);
  return (
    <div className='w-full h-full grid grid-cols-[3fr_3fr_2fr_2fr]'>
        <GridSection classes={`relative ${displayColor}`}>
            <Image className='h-full w-full'
                fill
                src={matchURLs[selected?.mode] ? matchURLs[selected?.mode] : '/missing_asset.png'}
                style={{objectFit: 'contain', transform: 'scale(.9)'}}
                alt={''}
                sizes={'10vw'}
            />
        </GridSection>
        <GridSection classes={displayColor}>
            <div className='relative-center text-fit font-bold italic'>
                {String(selected?.result).toUpperCase()}
            </div>
        </GridSection>
        <GridSection classes={displayColor}>
            <div className='relative-center text-fit font-bold italic'>
                {parse_battle_time(selected?.battle_time).date}
            </div>
        </GridSection>
        <GridSection classes={displayColor}>
            <div className='relative-center text-fit font-bold italic'>
                {parse_battle_duration(selected?.duration)}
            </div>
        </GridSection>
    </div>
  )
}

export default MatchInfoRow