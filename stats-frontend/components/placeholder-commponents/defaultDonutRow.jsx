import React from 'react'
import StatsDonutChart from '@/components/match-info-panel/statsDonutChart'
import GridSection from '@/components/gridSection'

const DefaultDonutRow = () => {
    return (
        <div className='relative grid grid-cols-3 min-h-0'>
            <GridSection classes={'relative grid grid-rows-[1fr_5fr]'}>
                <div className='chart-title text-nowrap'>Winrate (Map Only)</div>
                <StatsDonutChart
                    stats={[1,1]}
                    colors={['mediumseagreen', 'black']}
                    displayNum={`0.00 - 1.00`}
                />
            </GridSection>
            <GridSection classes={'grid grid-rows-[1fr_5fr] h-full'}>
                <div classes='chart-title text-nowrap'>Pickrate (Brawler on Map)</div>
                <StatsDonutChart
                    stats={[1,1]}
                    colors={['purple','black']}
                    displayNum={`0.00 - 1.00`}
                />
            </GridSection>
            <GridSection classes={'grid grid-rows-[1fr_5fr] h-full'}>
                <div classes='chart-title text-nowrap'>Winrate (Brawler on Map)</div>
                <StatsDonutChart
                    stats={[1,1]}
                    colors={['orange', 'black']}
                    displayNum={`0.00 - 1.00`}
                />
            </GridSection>
        </div>
    )
}

export default DefaultDonutRow