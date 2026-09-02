import React from 'react'
import BlockPlane from '@/components/3d-components/blockPlane'
import Block from '@/components/3d-components/block'

const InfoBlockPlane = ({xDeg, scaleFactor}) => {
  return (
    <BlockPlane xDeg={xDeg} yDeg={'0'} zDeg={'0'}>
        <div className={`relative w-full h-full grid grid-cols-[2fr_1fr] transform-3d`} 
             style={{
                transform: `scaleY(${scaleFactor}) skewX(20deg)`
        }}>            
            <div className='relative grid grid-rows-2 transform-3d'>
                <div className='relative transform-3d'><Block blockHeight={'75px'} color={'red'}/></div>
                <div className='relative grid grid-cols-3 transform-3d'>
                    <div className='relative transform-3d'><Block blockHeight={'75px'} color={'purple'}/></div>
                    <div className='relative transform-3d'><Block blockHeight={'75px'} color={'red'}/></div>
                    <div className='relative transform-3d'><Block blockHeight={'75px'} color={'green'}/></div>
                </div>
            </div>
            <div className='relative transform-3d'><Block blockHeight={'75px'} color={'green'}/></div>
        </div>
    </BlockPlane>
  )
}

export default InfoBlockPlane