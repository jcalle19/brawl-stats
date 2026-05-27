'use client'
import React from 'react'
import MatchBanner from './matchBanner.jsx';

const StatsPage = ({data}) => {
    return (
        <div style={{color: 'white', width: '100%', height: '100%'}}>
            {
                data.map((item, index) => 
                    <div key={index} style={{marginBottom: '5px'}}>
                        <MatchBanner matchData={item}/>
                    </div>
                )
            }
        </div>
    )
}

export default StatsPage