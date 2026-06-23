import React from 'react'

const MatchStatsRow = ({selected}) => {
    //date, duration, result, rank, elo change, mode
  return (
    <div className='relative w-full h-full min-h-0 grid grid-rows-[1fr_2fr_2fr] pt-5 pb-5 pr-2'>
        <div className='grid grid-cols-3 gap-3'>
            <div className='stats-bg'>5</div>
            <div className='stats-bg'>6</div>
            <div className='stats-bg'>7</div>
        </div>
        <div className='grid grid-cols-2 gap-3 mt-5'>
            <div className='stats-bg'>1</div>
            <div className='stats-bg'>2</div>
        </div>
        <div className='grid grid-cols-1 gap-3'>
            <div className='stats-bg mt-5'>4</div>
        </div>
    </div>
  )
}

export default MatchStatsRow