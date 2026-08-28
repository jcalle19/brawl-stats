import React from 'react'
import BlockPlane from '@/components/3d-components/blockPlane'
import Block from '@/components/3d-components/block'
const EloPanel = ({xDeg, yDeg, zDeg}) => {
  return (
    <BlockPlane xDeg={xDeg} yDeg={yDeg} zDeg={zDeg}>
        <div className='h-full w-full grid grid-cols-4 grid-rows-4 gap-2 transform-3d test-border'>
            <div className='relative transform-3d w-full h-full col-start-1 row-start-4'>
                <Block blockHeight={'10vmin'} color={'blue'}/>
            </div>
        </div>
    </BlockPlane>
  )
}

export default EloPanel