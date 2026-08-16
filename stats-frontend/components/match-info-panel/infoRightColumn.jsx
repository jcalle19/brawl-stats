import React from 'react'
import DonutChartRow from '@/components/match-info-panel/donutChartRow'
import DefaultDonutRow from '@/components/placeholder-commponents/defaultDonutRow'
import DefaultMatchStatsRow from '@/components/placeholder-commponents/defaultMatchStatsRow'
import MatchStatsRow from '@/components/match-info-panel/matchStatsRow'
import GridSection from '@/components/gridSection'

const InfoRightColumn = ({defaultDisplay, selected, focused}) => {
  return (
    <div className='relative w-full h-[95%] max-h-full grid grid-rows-[1fr_3fr] gap-5' style={{border: '1px solid red'}}>
        <GridSection>
          {true ? <DefaultDonutRow/> :
            <DonutChartRow selected={selected} focused={focused}/>
          }
        </GridSection>
        <GridSection>
          {true ? <DefaultMatchStatsRow/> :
            <MatchStatsRow selected={selected}/>
          }
        </GridSection>
    </div>
  )
}

export default InfoRightColumn