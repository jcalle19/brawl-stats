import React from 'react'

const Block = ({blockHeight, color}) => {
    const topFace = `absolute w-full h-full`;
    const leftFace = `absolute green `

  return (
    <div className='absolute w-full h-full transform-3d'>
        <div className={`${color} ${topFace} transform-3d`}></div>
        <div id='right-face' className='absolute green' style={{
                left: '100%',
                transformOrigin: 'left',
                transform: `rotateY(90deg)`,
                width: blockHeight,
                height: '100%',
            }}
        ></div>
        <div id='left-face' className='absolute purple' style={{
                top: '100%',
                transformOrigin: 'top',
                transform: `rotateX(-90deg)`,
                width: '100%',
                height: blockHeight,
            }}
        >hello</div>
    </div>
  )
}

export default Block