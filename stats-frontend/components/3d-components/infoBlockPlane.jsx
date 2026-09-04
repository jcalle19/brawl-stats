import React from 'react'
import BlockPlane from '@/components/3d-components/blockPlane'
import Block from '@/components/3d-components/block'
import BrawlerPortraits from '@/components/brawlerPortraits'
import Image from 'next/image'
import { matchURLs, rankedValueToIcon } from '@/public/matchURLMap.js'
import { parse_battle_duration, parse_battle_time } from '@/lib/components/matchFunctions'

//<BrawlerPortraits src={portraitURLs[selected?.team1?.brawler.name]} size={'10vw'} overflow={'true'}/>
const InfoBlockPlane = ({selected, xDeg, scaleFactor}) => {
  return (
    <BlockPlane xDeg={xDeg} yDeg={'0'} zDeg={'0'}>
        <div className={`relative w-full h-full grid grid-cols-[2fr_1fr] transform-3d`} 
             style={{
                transform: `scaleY(${scaleFactor}) skewX(20deg)`
        }}>            
            <div className='relative grid grid-rows-2 transform-3d'>
                <div className='relative transform-3d'>
                    <Block blockHeight={'75px'} color={'red'}>{selected.result}</Block>
                </div>
                <div className='relative grid grid-cols-3 transform-3d'>
                    <div className='relative transform-3d'>
                        <Block blockHeight={'75px'} color={'purple'}>
                            <Image
                                fill
                                src={matchURLs[selected?.mode] ? matchURLs[selected?.mode]: '/missing_asset.png'}
                                style={{objectFit: 'contain', transform: 'scale(.9)'}}
                                alt={''}
                                sizes={'15vw'}
                            />
                        </Block>
                    </div>
                    <div className='relative transform-3d'>
                        <Block blockHeight={'75px'} color={'red'}>{parse_battle_time(selected.battle_time).date}</Block>
                    </div>
                    <div className='relative transform-3d'>
                        <Block blockHeight={'75px'} color={'green'}>{parse_battle_duration(selected.duration)}</Block>
                    </div>
                </div>
            </div>
            <div className='relative transform-3d'>
                <Block blockHeight={'75px'} color={'green'}>
                    <Image
                        fill
                        src={rankedValueToIcon(selected?.rank_value_snapshot) ? rankedValueToIcon(selected?.rank_value_snapshot) : '/missing_asset.png'}
                        style={{objectFit: 'contain', transform: 'scale(.9)'}}
                        alt={''}
                        sizes={'15vw'}
                    />
                </Block>
            </div>
        </div>
    </BlockPlane>
  )
}

export default InfoBlockPlane