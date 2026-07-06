import React from 'react'
import Image from 'next/image'

const BrawlIcons = ({brawler, player, src, width, height, size}) => {
  return (
    <div style={{position: 'relative', aspectRatio: '1 / 1', width: `${width ? width : ''}`, height: `${height ? height : ''}`, 
                 top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }}>
        <Image src={`${src ? src : '/missing_asset.png'}`} 
          className='object-cover object-left'
          fill
          style={{height: '100%', overflow: 'hidden', background: 'none'}} 
          sizes={size} alt='highlight' 
          priority
        />
    </div>
  )
}

export default BrawlIcons;