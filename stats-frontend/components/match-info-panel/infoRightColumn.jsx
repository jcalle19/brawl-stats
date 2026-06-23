import React from 'react'
import DonutChartRow from '@/components/match-info-panel/donutChartRow'
import MatchStatsRow from '@/components/match-info-panel/matchStatsRow'

const InfoRightColumn = ({selected, focused}) => {
  console.log(selected);
  return (
    <div className='relative w-full h-full grid grid-rows-[1fr_3fr] overflow-y-auto'>
        <div>
          <DonutChartRow selected={selected} focused={focused}/>
        </div>
        <div>
          <MatchStatsRow selected={selected}/>
        </div>
    </div>
  )
}

export default InfoRightColumn