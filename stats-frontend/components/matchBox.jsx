'use client'
import React from 'react'
import MatchBanner from './matchBanner.jsx';

const MatchBox = ({data}) => {
    return (
        <div style={{
                color: 'white', 
                width: '100%', 
                height: '100%', 
                border: '1px dashed purple',
                padding: '5%',
                overflow: 'auto',
            }}>
            {
                data.map((item, index) => 
                    <div key={index} style={{marginBottom: '5px'}}>
                        <MatchBanner matchData={item} rankDelta={item.elo_value_snapshot - data[(index+1 < data.length ? index + 1 : 0)].elo_value_snapshot}/>
                    </div>
                )
            }
        </div>
    )
}

export default MatchBox;