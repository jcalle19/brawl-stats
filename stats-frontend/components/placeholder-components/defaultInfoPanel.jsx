import React from 'react'
import GridSection from '@/components/gridSection'
import SearchBar from '@/components/placeholder-components/playerSearchBar'
import MatchInfoRow from '@/components/placeholder-components/matchInfoRow'
import PlayerRow from '@/components/placeholder-components/playerRow'
const DefaultInfoPanel = () => {
    return (
        <div className='relative w-full h-[150%] md:h-full select-none grid grid-rows-[1fr_7fr] p-5 pl-15'>
            <GridSection classes={'grid grid-cols-2 md:grid-cols-[6fr_2fr] min-h-[3rem] test-border'}>
                <GridSection classes={''}>
                    <div className='relative-center huge-text'>Match Overview ID:123456</div>
                </GridSection>
                <GridSection classes={'test-borderd striped-bg rounded'}>
                    <div className='relative-center w-[75%] h-[25px]'>
                        <SearchBar/>
                    </div>
                </GridSection>
            </GridSection>
            <GridSection classes={'grid grid-rows-[3fr_1fr] md:grid-cols-[3fr_1fr] min-h-[25rem] test-border'}>
                <GridSection classes={'striped-bg md:row-span-2 grid grid-rows-[1fr_2fr]'}>
                    <GridSection classes={'flex'}>
                        <div className='aspect-square test-border'></div>
                        <GridSection classes={'grid grid-rows-[2fr_3fr]'}>
                            <GridSection>
                                <MatchInfoRow/>
                            </GridSection>
                            <GridSection>
                                <PlayerRow/>
                            </GridSection>
                        </GridSection>
                    </GridSection>
                    <GridSection classes={'flex test-border'}>
                        <div className='aspect-[21/33] test-border'></div>
                        <div></div>
                    </GridSection>
                </GridSection>
                <GridSection classes={'md:row-span-2 test-borderd'}>
                    top stats
                </GridSection>
            </GridSection>
        </div>
    )
}

export default DefaultInfoPanel