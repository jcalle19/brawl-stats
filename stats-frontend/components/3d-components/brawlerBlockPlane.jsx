import React from 'react'
import Block from '@/components/3d-components/block'
import BlockPlane from '@/components/3d-components/blockPlane'
import BrawlerPortraits from '@/components/brawlerPortraits'

import { portraitURLs } from '@/public/portaitURLMap'

//<BrawlIcons src={portraitURLs[selected?.team1?.brawler.name]} width={'100%'} size={portraitSize}/>
const BrawlerBlockPlane = ({selected, xDeg, scaleFactor}) => {
    console.log(selected);
  return (
    <BlockPlane xDeg={xDeg} yDeg={'0'} zDeg={'0'}>
        <div className={`relative w-full h-full grid grid-cols-[1fr_6fr_1fr] transform-3d`} 
             style={{
                    transform: `scaleY(${scaleFactor}) skewX(20deg)`
        }}>
            <div className='relative transform-3d'><Block blockHeight={'75px'} color={'orange'}/></div>
            <div className='grid grid-cols-3 grid-rows-2 transform-3d'>
                <div className='relative transform-3d'>
                    <Block blockHeight={'75px'} color={'green'}>
                        <BrawlerPortraits src={portraitURLs[selected?.brawler]} size={'10vw'} overflow={'true'}/>
                    </Block>
                </div>
                <div className='relative transform-3d'>
                    <Block blockHeight={'75px'} color={'red'}>
                        <BrawlerPortraits src={portraitURLs[selected?.team1?.brawler.name]} size={'10vw'} overflow={'true'}/>
                    </Block>
                </div>
                <div className='relative transform-3d'>
                    <Block blockHeight={'75px'} color={'red'}>
                        <BrawlerPortraits src={portraitURLs[selected?.team2?.brawler.name]} size={'10vw'} overflow={'true'}/>
                    </Block>
                </div>
                <div className='relative transform-3d'>
                    <Block blockHeight={'75px'} color={'red'}>
                        <BrawlerPortraits src={portraitURLs[selected?.enemy1?.brawler.name]} size={'10vw'} overflow={'true'}/>
                    </Block>
                </div>
                <div className='relative transform-3d'>
                    <Block blockHeight={'75px'} color={'red'}>
                        <BrawlerPortraits src={portraitURLs[selected?.enemy2?.brawler.name]} size={'10vw'} overflow={'true'}/>
                    </Block>
                </div>
                <div className='relative transform-3d'>
                    <Block blockHeight={'75px'} color={'red'}>
                        <BrawlerPortraits src={portraitURLs[selected?.enemy3?.brawler.name]} size={'10vw'} overflow={'true'}/>
                    </Block>
                </div>
            </div>
            <div className='relative transform-3d'>
                <Block blockHeight={'75px'} color={'orange'}/>
            </div>
        </div>
    </BlockPlane>
  )
}

export default BrawlerBlockPlane