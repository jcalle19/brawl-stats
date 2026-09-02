import React from 'react'

const IsoBlock = ({blockHeight, degOffset, color}) => {
    const radians = degOffset * Math.PI / 180;
  return (
    <div className='absolute w-full h-full transform-3d'>
        <div className={`${color} absolute w-full h-full transform-3d`}></div>

        <div id='left-face' className='absolute green w-full h-full transform-3d' style={{
                top: '0%',
                transformOrigin: 'left',
                transform: `rotateY(85deg) skewY(25deg)`,
                width: blockHeight,
                height: '100%',
            }}
        ></div>
        <div id='front-face' className='absolute purple' style={{
                top: '100%',
                transformOrigin: 'top',
                transform: `rotateX(${-1 * Number(degOffset)}deg)`,
                width: '100%',
                height: blockHeight,
            }}
        >hello</div>
    </div>
  )
}

export default IsoBlock