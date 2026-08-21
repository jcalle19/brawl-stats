import React from 'react'
import BrawlIcons from '@/components/brawlIcons'
import GridSection from '@/components/gridSection';
import { calc_display_stats } from '@/lib/components/matchFunctions';

/*
TODO
    - Put starting calculations in separate file
    - improved readability on this file

    <div className='relative-center' style={{writingMode: 'sideways-lr'}}>W/L (Map)</div>
                <div className='relative-center' style={{writingMode: 'sideways-lr'}}>Pick % (Map)</div>
                <div className='relative-center' style={{writingMode: 'sideways-lr'}}>W/L (Mode)</div>
                <div className='relative-center' style={{writingMode: 'sideways-lr'}}>Pick % (Mode)</div>
*/

const TopPlayerStats = ({username, focusedStats, selectedMatch}) => {
  //Calculating stats to compare
    const stats = calc_display_stats(focusedStats);
  return (
    <div id='stats-section' className='h-full grid grid-rows-[40px_4fr_2fr] min-h-0'>
        <div className='striped-bg h-full w-full grid grid-cols-2'>
            <div className='relative-center small-text font-bold'>Top 500</div>
            <div className='relative-center small-text font-bold'>{username}</div>
        </div>
        <div className='stats-bg relative grid grid-rows-4' style={{borderBottom: '1px solid purple'}}>
            <div className='grid grid-rows-[30px_1fr]'>
                <div className='relative-center purple'>W/L (Map)</div>
                <div className='relative-center grid grid-cols-2'>
                    <div>{focusedStats?.top_map_winrate ? focusedStats.top_map_winrate.toFixed(2) : '0.00'}</div>
                    <div className='relative-center italic' 
                        style={{color: `${stats.statColor.mapWLGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>
                        {stats.selectedMapWL.toFixed(2)}
                    </div>
                </div>
            </div>
            <div className='grid grid-rows-[30px_1fr]'>
                <div className='relative-center purple'>Pick % (Map)</div>
                <div className='relative-center italic grid grid-cols-2'>
                    <div>{focusedStats?.top_map_pickrate ? focusedStats?.top_map_pickrate?.toFixed(2) : '0.00'}</div>
                    <div className='relative-center italic'
                        style={{color: `${stats.statColor.mapPickGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>
                        {stats.selectedMapPick.toFixed(2)}
                    </div>
                </div>
            </div>
            <div className='grid grid-rows-[30px_1fr]'>
                <div className='relative-center purple'>W/L (Mode)</div>
                <div className='relative-center italic grid grid-cols-2'>
                    <div>{focusedStats?.top_mode_winrate ? focusedStats?.top_mode_winrate?.toFixed(2) : '0.00'}</div>
                    <div className='relative-center italic'
                        style={{color: `${stats.statColor.modeWLGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>
                        {stats.selectedModeWL.toFixed(2)}
                    </div>
                </div>
            </div>
            <div className='grid grid-rows-[30px_1fr]'>
                <div className='relative-center purple'>Pick % (Mode)</div>
                <div className='relative-center italic grid grid-cols-2'>
                    <div>{focusedStats?.top_mode_pickrate ? focusedStats?.top_mode_pickrate?.toFixed(2) : '0.00'}</div>
                    <div className='relative-center italic'
                        style={{color: `${stats.statColor.modePickGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>
                        {stats.selectedModePick.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-2'>
            <div className='relative-center huge-text font-bold italic'
                style={{color: `${stats.statColor.deltaGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>
                {stats.delta.toFixed(2) > 0 ? '+' : ''}{stats.delta.toFixed(2)}
            </div>
            <div className='relative-center huge-text font-bold italic'>{stats.grade}</div>
        </div>
    </div>
  )
}

export default TopPlayerStats