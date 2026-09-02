import React from 'react'
import BlockPlane from '@/components/3d-components/blockPlane'
import Block from '@/components/3d-components/block'
import BrawlerBlockPlane from '@/components/3d-components/brawlerBlockPlane'
import InfoBlockPlane from '@/components/3d-components/infoBlockPlane'
import MapBlockPlane from '@/components/3d-components/mapBlockPlane'
import GridSection from '@/components/gridSection'

const MatchStatsPlane = ({data}) => {
    const xDeg = 55;
    const radians = xDeg * Math.PI / 180;
    const scale = 1 / Math.cos(radians);

    return (
        <div className='relative top-[10%] w-[95%] h-[90%] min-h-[90vh]'>
            <GridSection classes={'grid grid-rows-[1fr_1fr_2fr]'}>
                <GridSection classes=''>
                    <InfoBlockPlane xDeg={xDeg} scaleFactor={scale}/>
                </GridSection>
                <GridSection classes='translate-z-500'>
                    <BrawlerBlockPlane xDeg={xDeg} scaleFactor={scale}/>
                </GridSection>
                <GridSection classes='translate-z-1000'>
                    <MapBlockPlane xDeg={xDeg} scaleFactor={scale}/>
                </GridSection>
            </GridSection>
        </div>
  )
}

export default MatchStatsPlane