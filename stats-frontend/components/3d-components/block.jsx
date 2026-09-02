import React from 'react'

const Block = ({children, blockHeight, color}) => {
    const topFace = `absolute w-full h-full`;
    const leftFace = `absolute green `

  return (
    <div className='ui-block absolute w-full h-full transform-3d pointer-events-auto test-border'>
        <div className={`${color} absolute w-full h-full transform-3d overflow-hidden`}>
            {children}
        </div>
        <div id='left-face' className='absolute green' style={{
                right: '100%',
                transformOrigin: 'right',
                transform: `rotateY(-90deg)`,
                width: blockHeight,
                height: '100%',
            }}
        ></div>
        <div id='front-face' className='absolute purple' style={{
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