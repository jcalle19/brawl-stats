import React from 'react'
import BlockPlane from '@/components/3d-components/blockPlane'
import Block from '@/components/3d-components/block'
const MatchInfoPlane = ({xDeg, yDeg, zDeg}) => {
    /*
    <div className='h-full w-full grid grid-cols-3 test-border'>
            <Block blockHeight={'75px'}/>
            <Block blockHeight={'75px'}/>
            <Block blockHeight={'75px'}/>
        </div>
    */
  return (
    <BlockPlane xDeg={xDeg} yDeg={yDeg} zDeg={zDeg}>
        <div className='h-full w-full grid grid-cols-1 transform-3d'>
            <div className='relative transform-3d w-full h-full'>
                <Block blockHeight={'10vmin'} color={'blue'}/>
            </div>
            <div className='relative transform-3d w-full h-full'>
                <Block blockHeight={'10vmin'} color={'red'}/>
            </div>
            <div className='relative transform-3d w-full h-full'>
                <Block blockHeight={'10vmin'} color={'orange'}/>
            </div>
            <div className='relative transform-3d w-full h-full'>
                <Block blockHeight={'10vmin'} color={'blue'}/>
            </div>
            <div className='relative transform-3d w-full h-full'>
                <Block blockHeight={'10vmin'} color={'blue'}/>
            </div>
        </div>
    </BlockPlane>
  )
}

export default MatchInfoPlane