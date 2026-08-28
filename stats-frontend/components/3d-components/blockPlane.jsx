import React from 'react'
import Block from '@/components/3d-components/block'

const BlockPlane = ({children, xDeg, yDeg, zDeg}) => {
    return (
        <div
            className="relative h-full w-full transform-3d"
            style={{
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