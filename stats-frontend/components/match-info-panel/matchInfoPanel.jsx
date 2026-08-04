'use client'
import React from 'react'
import { useMatchContext } from '@/contexts/matchContext'
import { useRefContext } from '@/contexts/refContext'
import InfoMapColumn from '@/components/match-info-panel/infoMapColumn'
import InfoRightColumn from '@/components/match-info-panel/infoRightColumn'
import TopPlayerStats from '@/components/match-info-panel/topPlayerStats'
import '@/css/matchInfoPanel.css'

const MatchInfoPanel = ({username}) => {
    const { currUsername } = useRefContext();
    const {selectedMatch, focusedStats} = useMatchContext();

    //Calculating stats to compare
    const mapTotalGames = focusedStats?.maps.wins + focusedStats?.maps.losses;
    const brawlerMapGames = focusedStats?.brawlers_map.wins + focusedStats?.brawlers_map.losses;
    const modeTotalGames = focusedStats?.modes.wins + focusedStats?.modes.losses;
    const brawlerModeGames = focusedStats?.brawlers_mode.wins + focusedStats?.brawlers_mode.losses;

    const selectedMapWL = focusedStats?.brawlers_map.wins / brawlerMapGames;
    const selectedModeWL = focusedStats?.brawlers_mode.wins / brawlerModeGames;
    const selectedMapPick = brawlerMapGames / mapTotalGames;
    const selectedModePick =  brawlerModeGames / modeTotalGames;

    const statColor = {
        mapWLGreen: (selectedMapWL >= focusedStats?.top_map_winrate),
        modeWLGreen: (selectedModeWL >= focusedStats?.top_mode_winrate),
        mapPickGreen: (selectedMapPick >= focusedStats?.top_map_pickrate),
        modePickGreen: (selectedModePick >= focusedStats?.top_mode_pickrate)
    };

    currUsername.current = username;
    return (
        <div className='relative w-full h-full select-none overflow-hidden'>
            <div className='relative w-full h-full p-[2%] grid grid-rows-[2fr_1fr]'>
                <div id='info-panel-main' className='relative min-h-0 w-full h-full'>
                    <div className='relative w-full h-full min-w-0 min-h-0 grid grid-cols-[2fr_3fr] gap-3'>
                        <InfoMapColumn mapName={selectedMatch?.map}/>
                        <InfoRightColumn selected={selectedMatch} focused={focusedStats}/>
                    </div>
                </div>
                <div id='stats-section' className='grid grid-cols-[2fr_4fr_1fr]'>
                    <div className='h-full w-full' style={{backgroundColor: 'blue'}}><TopPlayerStats match={selectedMatch}/></div>
                    <div className='h-full w-full grid grid-rows-[1fr_3fr_3fr]' style={{backgroundColor: 'green'}}>
                        <div className='purple grid grid-cols-4'>
                            <div className='relative-center small-text font-bold'>W/L (Map)</div>
                            <div className='relative-center small-text font-bold'>Pick % (Map)</div>
                            <div className='relative-center small-text font-bold'>W/L (Mode)</div>
                            <div className='relative-center small-text font-bold'>Pick % (Map)</div>
                        </div>
                        <div className='stats-bg relative grid grid-cols-4' style={{borderBottom: '1px solid purple'}}>
                            <div className='relative-center large-text font-bold italic' style={{color: 'orange'}}>{focusedStats?.top_map_winrate?.toFixed(2)}</div>
                            <div className='relative-center large-text font-bold italic' style={{color: 'orange'}}>{focusedStats?.top_map_pickrate?.toFixed(2)}</div>
                            <div className='relative-center large-text font-bold italic' style={{color: 'orange'}}>{focusedStats?.top_mode_winrate?.toFixed(2)}</div>
                            <div className='relative-center large-text font-bold italic' style={{color: 'orange'}}>{focusedStats?.top_mode_pickrate?.toFixed(2)}</div>
                        </div>
                        <div className='stats-bg relative grid grid-cols-4' style={{backgroundColor: 'orange'}}>
                            <div className='relative-center large-text font-bold italic' 
                                 style={{color: `${statColor.mapWLGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{selectedMapWL.toFixed(2)}</div>
                            <div className='relative-center large-text font-bold italic'
                                 style={{color: `${statColor.mapPickGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{selectedMapPick.toFixed(2)}</div>
                            <div className='relative-center large-text font-bold italic'
                                 style={{color: `${statColor.modeWLGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{selectedModeWL.toFixed(2)}</div>
                            <div className='relative-center large-text font-bold italic'
                                 style={{color: `${statColor.modePickGreen ? 'var(--uiGreen)' : 'var(--uiRed)'}`}}>{selectedModePick.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className='h-full w-full' style={{backgroundColor: 'yellow'}}></div>
                </div>
            </div>
        </div>
    )
}

export default MatchInfoPanel