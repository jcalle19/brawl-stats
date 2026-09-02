import React from 'react'
import BlockPlane from '@/components/3d-components/blockPlane'
import Block from '@/components/3d-components/block'

const MapBlockPlane = ({xDeg, scaleFactor}) => {
    return (
        <BlockPlane xDeg={xDeg} yDeg={'0'} zDeg={'0'}>
            <div className={`w-full h-full grid grid-cols-2 transform-3d`} 
                 style={{
                    transform: `scaleY(${scaleFactor}) skewX(20deg)`
            }}>           
                <div className='relative transform-3d'><Block blockHeight={'75px'} color={'green'}/></div>
                <div className='relative transform-3d'><Block blockHeight={'75px'} color={'red'}/></div>
            </div>
        </BlockPlane>
    )
}

export default MapBlockPlane