import React from 'react'
import BrawlIcons from '../brawlIcons'
import { calc_display_stats } from '@/lib/components/matchFunctions';

/*
TODO
    - Put starting calculations in separate file
*/

const TopPlayerStats = ({username, focusedStats, selectedMatch}) => {
  //Calculating stats to compare
    const stats = calc_display_stats(focusedStats);
  return (
    <div id='stats-section' className='h-full grid grid-cols-[40px_4fr_2fr_1fr] min-h-0'>
      <div className='striped-bg h-full w-full grid grid-rows-[1fr_3fr_3fr]'>
          <div className='purple'></div>
          <div className='relative-center small-text font-bold' style={{writingMode: 'sideways-lr'}}>Top 500</div>
          <div className='relative-center small-text font-bold' style={{writingMode: 'sideways-lr'}}>{username}</div>
      </div>
      <div className='h-full w-full grid grid-rows-[1fr_3fr_3fr]' style={{backgroundColor: 'green'}}>
          <div className='purple grid grid-cols-4'>
              <div className='relative-center small-text font-bold'>W/L (Map)</div>
              <div className='relative-center small-text font-bold'>Pick % (Map)</div>
              <div className='relative-center small-text font-bold'>W/L (Mode)</div>
              <div className='relative-center small-text font-bold'>Pick % (Mode)</div>
          </div>
          <div className='stats-bg relative grid grid-cols-4' style={{borderBottom: '1px solid purple'}}>
              <div className='relative-center large-text font-bold italic'>
                  {focusedStats?.top_map_winrate ? focusedStats.top_map_winrate.toFixed(2) : '0.00'}
              </div>
              <div className='relative-center large-text font-bold italic'>
                  {focusedStats?.top_map_pickrate ? focusedStats?.top_map_pickrate?.toFixed(2) : '0.00'}
              </div>
              <div className='relative-center large-text font-bold italic'>
                  {focusedStats?.top_mode_winrate ? focusedStats?.top_mode_winrate?.toFixed(2) : '0.00'}
              </div>
              <div className='relative-center large-text font-bold italic'>
                  {focusedStats?.top_mode_pickrate ? focusedStats?.top_mode_pickrate?.toFixed(2) : '0.00'}
              </div>
          </div>
          <div className='stats-bg relative grid grid-cols-4' style={{backgroundColor: 'orange'}}>
              <div className='relative-center large-text font-bold italic' 
                   style={{color: `${stats.statColor.mapWLGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{stats.selectedMapWL.toFixed(2)}</div>
              <div className='relative-center large-text font-bold italic'
                   style={{color: `${stats.statColor.mapPickGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{stats.selectedMapPick.toFixed(2)}</div>
              <div className='relative-center large-text font-bold italic'
                   style={{color: `${stats.statColor.modeWLGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{stats.selectedModeWL.toFixed(2)}</div>
              <div className='relative-center large-text font-bold italic'
                   style={{color: `${stats.statColor.modePickGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{stats.selectedModePick.toFixed(2)}</div>
          </div>
      </div>
      <div className='h-full w-full grid grid-rows-[1fr_6fr]' style={{borderLeft: '1px solid purple'}}>
        <div className='purple'>
            <div className='relative-center small-text font-bold'>Stat Δ</div>
        </div>
        <div className='relative-center huge-text font-bold italic'
             style={{color: `${stats.statColor.deltaGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>
            {stats.delta.toFixed(2) > 0 ? '+' : ''}{stats.delta.toFixed(2)}
        </div>
      </div>
      <div className='h-full w-full grid grid-rows-[1fr_6fr]' style={{borderLeft: '1px solid purple'}}>
        <div className='purple'>
            <div className='relative-center small-text font-bold'>Grade</div>
        </div>
        <div className='relative-center huge-text font-bold italic'>{stats.grade}</div>
      </div>
    </div>
  )
}

export default TopPlayerStats