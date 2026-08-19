import React from 'react'

const PlayerRow = () => {
    const commonTraits = 'h-full aspect-square test-border'
  return (
    <div className='green h-full w-full flex justify-between overflow-x-auto'>
        <div className={commonTraits}></div>
        <div className={commonTraits}></div>
        <div className={commonTraits}></div>
        <div className={commonTraits}></div>
        <div className={commonTraits}></div>
        <div className={commonTraits}></div>
    </div>
  )
}

export default PlayerRow