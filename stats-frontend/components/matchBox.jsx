'use client'
import React from 'react'
import MatchBanner from './matchBanner.jsx';

const MatchBox = ({data}) => {
    return (
        <div style={{
                color: 'white', 
                width: '50%', 
                height: '100%', 
                border: '1px dashed purple',
                overflow: 'auto',
            }}>
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

export default MatchBox;