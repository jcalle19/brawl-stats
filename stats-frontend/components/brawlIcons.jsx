import React from 'react'
import Image from 'next/image'

const BrawlIcons = ({brawler, player, src, width, height, size}) => {
  return (
    <div style={{position: 'relative', aspectRatio: '1 / 1', width: `${width ? width : ''}`, height: `${height ? height : ''}`, 
                 top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }}>
        <Image src={`${src ? src : 'https://ai6j31goj4.ufs.sh/f/iNpc9vxDVhQlVE8ScBv6parfz2OgK9h5TkJ3iq48oAvU7PYd'}`} 
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