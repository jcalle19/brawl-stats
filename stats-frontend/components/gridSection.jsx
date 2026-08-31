import React from 'react'

const GridSection = ({children, classes}) => {
  return (
    <div className={`relative h-full w-full min-h-0 ${classes} transform-3d`}>
      {children}
    </div>
  )
}

export default GridSection