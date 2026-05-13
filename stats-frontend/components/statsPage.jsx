'use client'
import React from 'react'

const StatsPage = ({data}) => {
    console.log(data);
    return (
        <div style={{color: 'white', width: '100%', height: '100%'}}>
            {
                data.items.map((item, index) => 
                    <div key={index} className='grid grid-cols-11'>
                        <div>{item.event.mode}</div>
                        <div>{item.event.map}</div>
                        <div>{item.battle.starPlayer?.brawler.name}</div>
                        <div>{item.battle.result}</div>
                    </div>
                )
            }
        </div>
    )
}

export default StatsPage