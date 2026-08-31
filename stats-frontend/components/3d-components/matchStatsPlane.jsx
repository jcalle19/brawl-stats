import React from 'react'
import BlockPlane from '@/components/3d-components/blockPlane'
import Block from '@/components/3d-components/block'
import GridSection from '../gridSection'

const MatchStatsPlane = ({xDeg, yDeg, zDeg}) => {
  return (
    <BlockPlane xDeg={xDeg} yDeg={yDeg} zDeg={zDeg}> 
        <div className='w-[110%] h-[110%] grid grid-rows-[1fr_2fr_4fr] transform-3d'>
            <GridSection classes={'grid grid-cols-[3fr_2fr]'}>
                <GridSection classes={'grid grid-rows-2'}>
                    <GridSection classes='test-border'></GridSection>
                    <GridSection classes='test-border'></GridSection>
                </GridSection>
                <div className='relative transform-3d w-full h-full'>
                    <Block blockHeight={'10vmin'} color={'red'}/>
                </div>
            </GridSection>
            <GridSection classes={'grid grid-cols-[1fr_3fr_2fr]'}>
                <GridSection classes='test-border'></GridSection>
                <GridSection classes={'grid grid-cols-3 grid-rows-2'}>
                    <GridSection classes='test-border'></GridSection>
                    <GridSection classes='test-border'></GridSection>
                    <GridSection classes='test-border'></GridSection>
                    <GridSection classes='test-border'></GridSection>
                    <GridSection classes='test-border'></GridSection>
                    <GridSection classes='test-border'></GridSection>
                </GridSection>
                <GridSection classes='test-border'></GridSection>
            </GridSection>
            <GridSection classes='grid grid-cols-[1fr_3fr_2fr]'>
                <GridSection classes='test-border'></GridSection>
                <GridSection classes='test-border'></GridSection>
                <GridSection classes='test-border'></GridSection>
            </GridSection>
        </div>
    </BlockPlane>
  )
}

export default MatchStatsPlane