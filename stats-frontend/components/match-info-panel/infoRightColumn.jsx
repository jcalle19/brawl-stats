import React from 'react'
import DonutChartRow from '@/components/match-info-panel/donutChartRow'
import MatchStatsRow from '@/components/match-info-panel/matchStatsRow'

const InfoRightColumn = ({selected, focused}) => {
  return (
    <div className='relative w-full h-full h-max-full grid grid-rows-[1fr_3fr] pt-5 overflow-y-auto'>
        <div className='overflow-hidden'>
          <DonutChartRow selected={selected} focused={focused}/>
        </div>
        <div className=''>
          <MatchStatsRow selected={selected}/>
        </div>
    </div>
  )
}

export default InfoRightColumn