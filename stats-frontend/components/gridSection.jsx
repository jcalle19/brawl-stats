import React from 'react'

const GridSection = ({children, classes}) => {
  return (
    <div className={`h-full w-full min-h-0 ${classes} overflow-auto`}>
      {children}
    </div>
  )
}

export default GridSection