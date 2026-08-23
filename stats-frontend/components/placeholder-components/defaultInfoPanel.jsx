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
    /* 
    <div className='relative w-full h-[150%] md:h-full select-none grid grid-rows-[1fr_7fr] p-5 pt-15'>
            <GridSection classes={'grid grid-cols-2 md:grid-cols-[3fr_1fr] min-h-[3rem] gap-8'}>
                <GridSection classes={''}>
                    <div className='relative-center huge-text'>Match Overview ID:{selectedMatch?.player_id}</div>
                </GridSection>
                <GridSection classes={'striped-bg rounded'}>
                    <div className='relative-center w-[75%] h-[25px]'><SearchBar/></div>
                </GridSection>
            </GridSection>
            <GridSection classes={'grid grid-rows-[fit_500px] md:grid-cols-[3fr_1fr] min-h-[25rem] gap-8'}>
                <GridSection classes={'md:row-span-2 grid grid-rows-[1fr_2fr]'}>
                        <GridSection classes={'grid grid-rows-2 md:grid-rows-[3fr_5fr]'}>
                            <GridSection><MatchInfoRow selected={selectedMatch}/></GridSection>
                            <GridSection><PlayerRow selected={selectedMatch}/></GridSection>
                        </GridSection>
                    <GridSection classes={'flex'}>
                        <div className='relative grid grid-rows-[1fr_12fr]'>
                            <GridSection classes={'purple'}>
                                <div className='relative-center text-fit-sm font-bold italic'>
                                    {selectedMatch?.map}
                                </div>
                            </GridSection>
                            <MapBase selectedMap={selectedMatch?.map}/>
                        </div>
                        <GridSection classes={'grid grid-rows-2 test-border'}>
                            <GridSection classes={'striped-bg'}><MatchEloInfo selected={selectedMatch}/></GridSection>
                            <GridSection classes={''}><DonutRow focused={focusedStats}/></GridSection>
                        </GridSection>
                    </GridSection>
                </GridSection>
                <GridSection classes={'md:row-span-2'}>
                    <TopPlayerStats username={'Kriby'} focusedStats={focusedStats} selectedMatch={selectedMatch}/>
                </GridSection>
            </GridSection>
        </div>
    */
    return (
        <>
            <div className='hidden relative w-full h-[150%] md:h-full select-none md:grid grid-rows-[1fr_7fr] p-5 pt-15'>
                <GridSection classes={'grid grid-cols-2 md:grid-cols-[3fr_1fr] min-h-[3rem] gap-8'}>
                    <GridSection classes={''}>
                        <div className='relative-center huge-text'>Match Overview ID:{selectedMatch?.player_id}</div>
                    </GridSection>
                    <GridSection classes={'striped-bg rounded'}>
                        <div className='relative-center w-[75%] h-[25px]'><SearchBar/></div>
                    </GridSection>
                </GridSection>
                <GridSection classes={'grid grid-rows-[fit_500px] md:grid-cols-[3fr_1fr] min-h-[25rem] gap-8'}>
                    <GridSection classes={'md:row-span-2 grid grid-rows-[1fr_2fr]'}>
                            <GridSection classes={'grid grid-rows-2 md:grid-rows-[3fr_5fr]'}>
                                <GridSection><MatchInfoRow selected={selectedMatch}/></GridSection>
                                <GridSection><PlayerRow selected={selectedMatch}/></GridSection>
                            </GridSection>
                        <GridSection classes={'flex'}>
                            <div className='relative grid grid-rows-[1fr_12fr]'>
                                <GridSection classes={'purple'}>
                                    <div className='relative-center text-fit-sm font-bold italic'>
                                        {selectedMatch?.map}
                                    </div>
                                </GridSection>
                                <MapBase selectedMap={selectedMatch?.map}/>
                            </div>
                            <GridSection classes={'grid grid-rows-2 test-border'}>
                                <GridSection classes={'striped-bg'}><MatchEloInfo selected={selectedMatch}/></GridSection>
                                <GridSection classes={''}><DonutRow focused={focusedStats}/></GridSection>
                            </GridSection>
                        </GridSection>
                    </GridSection>
                    <GridSection classes={'md:row-span-2'}>
                        <TopPlayerStats username={'Kriby'} focusedStats={focusedStats} selectedMatch={selectedMatch}/>
                    </GridSection>
                </GridSection>
            </div>
            <div className='md:hidden relative w-full h-fit md:h-full select-none grid md:grid-rows-[1fr_7fr] md:grid-cols-[3fr_1fr] p-5 pt-15 test-border'>
                <GridSection id='mobile-view' classes={'block md:hidden grid grid-rows-[75px_75px_auto_auto_auto_auto_500px] row-span-2'}>
                    <GridSection classes={'grid grid-cols-2 md:grid-cols-[3fr_1fr] min-h-[3rem] max-h-[75px] gap-8'}>
                        <GridSection classes={''}>
                            <div className='relative-center text-fit'>Match Overview ID:{selectedMatch?.player_id}</div>
                        </GridSection>
                        <GridSection classes={'striped-bg rounded'}>
                            <div className='relative-center w-[75%] h-[25px]'><SearchBar/></div>
                        </GridSection>
                    </GridSection>
                    <GridSection classes={'min-h-[3rem] max-h-[75px]'}><MatchInfoRow selected={selectedMatch}/></GridSection>
                    <GridSection classes={''}><PlayerRow selected={selectedMatch}/></GridSection>
                    <GridSection classes={'max-h-[500px] test-border'}></GridSection>
                    <GridSection classes={'max-h-[500px] test-border'}></GridSection>
                    <GridSection classes={'max-h-[500px]'}>
                        <TopPlayerStats username={'Kriby'} focusedStats={focusedStats} selectedMatch={selectedMatch}/>
                    </GridSection>
                </GridSection>
            </div>
        </>
        
    )
}

export default DefaultInfoPanel