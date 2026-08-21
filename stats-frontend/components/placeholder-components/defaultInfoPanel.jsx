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
        <div className='relative w-full h-[150%] md:h-full select-none grid grid-rows-[1fr_7fr] p-5 pl-15'>
            <GridSection classes={'grid grid-cols-2 md:grid-cols-[6fr_2fr] min-h-[3rem] test-border'}>
                <GridSection classes={''}>
                    <div className='relative-center huge-text'>Match Overview ID:{selectedMatch?.player_id}</div>
                </GridSection>
                <GridSection classes={'test-borderd striped-bg rounded'}>
                    <div className='relative-center w-[75%] h-[25px]'><SearchBar/></div>
                </GridSection>
            </GridSection>
            <GridSection classes={'grid grid-rows-[3fr_2fr] md:grid-cols-[3fr_1fr] min-h-[25rem] test-border'}>
                <GridSection classes={'striped-bg md:row-span-2 grid grid-rows-[1fr_2fr]'}>
                    <GridSection classes={'flex'}>
                        <div className='aspect-square test-border'>
                            <BrawlIcons src={portraitURLs[selectedMatch?.brawler]} width={'100%'} size={'20vw'}/>
                        </div>
                        <GridSection classes={'grid grid-rows-[2fr_3fr]'}>
                            <GridSection><MatchInfoRow selected={selectedMatch}/></GridSection>
                            <GridSection><PlayerRow selected={selectedMatch}/></GridSection>
                        </GridSection>
                    </GridSection>
                    <GridSection classes={'flex test-border'}>
                        <div className='relative grid grid-rows-[1fr_12fr] test-border'>
                            <GridSection>{selectedMatch?.map}</GridSection>
                            <MapBase selectedMap={selectedMatch?.map}/>
                        </div>
                        <GridSection classes={'grid grid-rows-2'}>
                            <GridSection classes={'test-border'}><MatchEloInfo selected={selectedMatch}/></GridSection>
                            <GridSection classes={'test-border'}><DonutRow focused={focusedStats}/></GridSection>
                        </GridSection>
                    </GridSection>
                </GridSection>
                <GridSection classes={'md:row-span-2 test-borderd'}>
                    <TopPlayerStats username={'Kriby'} focusedStats={focusedStats} selectedMatch={selectedMatch}/>
                </GridSection>
            </GridSection>
        </div>
    )
}

export default DefaultInfoPanel