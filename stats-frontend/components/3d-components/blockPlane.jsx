import React from 'react'
import Block from '@/components/3d-components/block'

const BlockPlane = ({children, width, height, xDeg, yDeg, zDeg}) => {
    return (
        <div
            className="test-border transform-3d"
            style={{
                width,
                height,
                transform: `
                    rotateX(${xDeg}deg)
                    rotateY(${yDeg}deg)
                    rotateZ(${zDeg}deg)
                `
            }}
        >
            {children}
        </div>
  )
}

export default BlockPlane