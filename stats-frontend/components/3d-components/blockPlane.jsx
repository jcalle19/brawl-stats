import React from 'react'
import Block from '@/components/3d-components/block'

const BlockPlane = ({children, xDeg, yDeg, zDeg}) => {
    return (
        <div
            className="relative h-full w-full transform-3d"
            style={{
                transform: `
                    rotateY(${zDeg}deg)
                    rotateZ(${yDeg}deg)
                    rotateX(${xDeg}deg)
                `
            }}
        >
            {children}
        </div>
  )
}

export default BlockPlane