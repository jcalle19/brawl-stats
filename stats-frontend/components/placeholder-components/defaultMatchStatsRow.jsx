import React from 'react'
import GridSection from '@/components/gridSection'
const DefaultMatchStatsRow = () => {
  return (
        <div className='relative w-full h-full min-h-0 grid grid-rows-[1fr_2fr_2fr] pb-0 gap-3 font-bold tracking-wider'>
            <GridSection classes={'relative grid grid-cols-3 gap-3'}>
                <GridSection classes={'relative green'}>
                    <div className='relative-center small-text'>Selected Player</div>
                </GridSection>
                <GridSection classes={'green'}>
                    <div className='relative-center small-text'>Match Result</div>
                </GridSection>
                <GridSection classes={`relative`}>
                    <div className='grid grid-rows-2 h-full gap-3'>
                        <GridSection classes={`relative green`}>
                            <div className='relative-center small-text'>Date</div>
                        </GridSection>
                        <GridSection classes={`relative green`}>
                            <div className='relative-center small-text'>Duration</div>
                        </GridSection>
                    </div>
                </GridSection>
            </GridSection>
            <GridSection classes={'flex relative lg:grid lg:grid-cols-5 stats-bg p-2 gap-1'}>
                <div className='vert-center flex-none striped-bg aspect-square'></div>
                <div className='vert-center flex-none striped-bg aspect-square'></div>
                <div className='vert-center flex-none striped-bg aspect-square'></div>
                <div className='vert-center flex-none striped-bg aspect-square'></div>
                <div className='vert-center flex-none striped-bg aspect-square'></div>
            </GridSection>
            <GridSection classes={'relative grid grid-cols-[2fr_3fr] row-start-3 gap-3'}>
                <div className='stats-bg'>Team</div>
                <div className='stats-bg'>Enemies</div>
            </GridSection>
        </div>
    )
}

export default DefaultMatchStatsRow