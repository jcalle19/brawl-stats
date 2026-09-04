import React from 'react'
import BlockPlane from '@/components/3d-components/blockPlane'
import Block from '@/components/3d-components/block'
import MapBase from '@/components/map-parts/mapBase.jsx'

const MapBlockPlane = ({selected, xDeg, scaleFactor}) => {
    //[@media(min-aspect-ratio:1/1)]:grid-cols-2
    return (
        <BlockPlane xDeg={xDeg} yDeg={'0'} zDeg={'0'}>
            <div className={`w-full h-full grid grid-cols-2 transform-3d`} 
                 style={{
                    transform: `scaleY(${scaleFactor}) skewX(20deg)`
            }}>           
                <div className='relative grid grid-cols-2 grid-rows-[1fr_3fr_3fr_3fr] transform-3d'>
                    <div className='relative transform-3d row-start-1 col-start-1 col-span-2'>
                        <Block blockHeight={'75px'} color={'green'}>
                            <div>Map and Brawler Stats</div>
                        </Block>
                    </div>
                    <div className='relative transform-3d row-start-2 col-start-1'>
                        <Block blockHeight={'75px'} color={'purple'}>
                            <div>Map Winrate</div>
                        </Block>
                    </div>
                    <div className='relative transform-3d row-start-3 col-start-1'>
                        <Block blockHeight={'75px'} color={'green'}>
                            <div>Brawler Pickrate</div>
                        </Block>
                    </div>
                    <div className='relative transform-3d row-start-4 col-start-1'>
                        <Block blockHeight={'75px'} color={'purple'}>
                            <div>Brawler Winrate</div>
                        </Block>
                    </div>
                    <div className='relative transform-3d row-start-2 col-start-2'>
                        <Block blockHeight={'75px'} color={'red'}>
                        </Block>
                    </div>
                    <div className='relative transform-3d row-start-3 col-start-2'>
                        <Block blockHeight={'75px'} color={'purple'}>
                        </Block>
                    </div>
                    <div className='relative transform-3d row-start-4 col-start-2'>
                        <Block blockHeight={'75px'} color={'red'}>
                        </Block>
                    </div>
                </div>
                <div className='relative transform-3d'>
                    <Block blockHeight={'75px'} color={'red'}>
                        <MapBase selectedMap={selected?.map}/>
                    </Block>
                </div>
            </div>
        </BlockPlane>
    )
}

export default MapBlockPlane