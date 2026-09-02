import React from 'react'
import Block from '@/components/3d-components/block'
import BlockPlane from '@/components/3d-components/blockPlane'

const BrawlerBlockPlane = ({xDeg, scaleFactor}) => {
  return (
    <BlockPlane xDeg={xDeg} yDeg={'0'} zDeg={'0'}>
        <div className={`relative w-full h-full grid grid-cols-[1fr_6fr_1fr] transform-3d`} 
             style={{
                    transform: `scaleY(${scaleFactor}) skewX(20deg)`
        }}>
            <div className='relative transform-3d'><Block blockHeight={'75px'} color={'orange'}/></div>
            <div className='grid grid-cols-3 grid-rows-2 transform-3d'>
                <div className='relative transform-3d'><Block blockHeight={'75px'} color={'green'}/></div>
                <div className='relative transform-3d'><Block blockHeight={'75px'} color={'red'}/></div>
                <div className='relative transform-3d'><Block blockHeight={'75px'} color={'green'}/></div>
                <div className='relative transform-3d'><Block blockHeight={'75px'} color={'red'}/></div>
                <div className='relative transform-3d'><Block blockHeight={'75px'} color={'green'}/></div>
                <div className='relative transform-3d'><Block blockHeight={'75px'} color={'red'}/></div>
            </div>
            <div className='relative transform-3d'><Block blockHeight={'75px'} color={'orange'}/></div>
        </div>
    </BlockPlane>
  )
}

export default BrawlerBlockPlane