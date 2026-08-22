'use client'
import React from 'react'
import GridSection from '@/components/gridSection'
import SearchBar from '@/components/placeholder-components/playerSearchBar'
import MatchInfoRow from '@/components/placeholder-components/matchInfoRow'
import PlayerRow from '@/components/placeholder-components/playerRow'
import MatchEloInfo from '@/components/placeholder-components/matchEloInfo'
import DonutRow from '@/components/placeholder-components/donutRow'
import BrawlIcons from '@/components/brawlIcons'
import MapBase from '@/components/map-parts/mapBase'
import TopPlayerStats from '@/components/match-info-panel/topPlayerStats'
import { useMatchContext } from '@/contexts/matchContext'
import { portraitURLs } from '@/public/portaitURLMap.js'

const DefaultInfoPanel = () => {
    const {selectedMatch, focusedStats} = useMatchContext();
    return (
        <div className='relative w-full h-[150%] md:h-full select-none grid grid-rows-[1fr_7fr] p-5 pt-15'>
            <GridSection classes={'grid grid-cols-2 md:grid-cols-[6fr_2fr] min-h-[3rem]'}>
                <GridSection classes={''}>
                    <div className='relative-center huge-text'>Match Overview ID:{selectedMatch?.player_id}</div>
                </GridSection>
                <GridSection classes={'striped-bg rounded'}>
                    <div className='relative-center w-[75%] h-[25px]'><SearchBar/></div>
                </GridSection>
            </GridSection>
            <GridSection classes={'grid grid-rows-[3fr_2fr] md:grid-cols-[3fr_1fr] min-h-[25rem]'}>
                <GridSection classes={'striped-bg md:row-span-2 grid grid-rows-[1fr_2fr]'}>
                        <GridSection classes={'grid grid-rows-[2fr_3fr] test-border'}>
                            <GridSection><MatchInfoRow selected={selectedMatch}/></GridSection>
                            <GridSection classes={'overflow-hidden'}><PlayerRow selected={selectedMatch}/></GridSection>
                        </GridSection>
                    <GridSection classes={'flex'}>
                        <div className='relative grid grid-rows-[1fr_12fr]'>
                            <GridSection classes={'orange'}>
                                <div className='relative-center text-fit-sm font-bold italic'>
                                    {selectedMatch?.map}
                                </div>
                            </GridSection>
                            <MapBase selectedMap={selectedMatch?.map}/>
                        </div>
                        <GridSection classes={'grid grid-rows-2'}>
                            <GridSection classes={''}><MatchEloInfo selected={selectedMatch}/></GridSection>
                            <GridSection classes={''}><DonutRow focused={focusedStats}/></GridSection>
                        </GridSection>
                    </GridSection>
                </GridSection>
                <GridSection classes={'md:row-span-2'}>
                    <TopPlayerStats username={'Kriby'} focusedStats={focusedStats} selectedMatch={selectedMatch}/>
                </GridSection>
            </GridSection>
        </div>
    )
}

export default DefaultInfoPanel