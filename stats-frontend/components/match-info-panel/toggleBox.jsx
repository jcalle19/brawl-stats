import React from 'react'
import '@/css/matchStatsRow.css'

//Toggleable display that can be set within an element as an overlay
const ToggleBox = ({colorClass, content, selectedId, boxId}) => {
  return (
     <div className={`identity-box transition-transform duration-300 text-xs pl-1
                      ${colorClass} ${selectedId === boxId ? 'scale-100!' : 'scale-0!'}`}
    >
        {content.map((item, index) => (
            <div key={index}>{item}</div>
        ))}
    </div>
  )
}

export default ToggleBox