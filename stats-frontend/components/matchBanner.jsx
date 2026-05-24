import React from 'react'
import '@/css/matchBanner.css'
const MatchBanner = ({matchData}) => {
  return (
    <div className='grid grid-rows-3 match-banner-parent'>
        <div className='row-start-1'>
            <div>Result</div>
        </div>
        <div className='row-start-2 grid grid-cols-2'>
            <div className='col-start-1'>mode</div>
            <div className='col-start-2'>map</div>
        </div>
        <div className='row-start-3 grid grid-cols-7'>
            <div className='brawler-icon-parent'></div>
            <div className='brawler-icon-parent'></div>
            <div className='brawler-icon-parent'></div>
            <div>vs.</div>
            <div className='brawler-icon-parent'></div>
            <div className='brawler-icon-parent'></div>
            <div className='brawler-icon-parent'></div>
        </div>
    </div>
  )
}

export default MatchBanner