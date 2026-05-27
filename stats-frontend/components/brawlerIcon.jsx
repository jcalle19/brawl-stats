import React from 'react'
import Image from 'next/image'

const BrawlerIcon = ({brawler, player, src, width, height}) => {
  console.log(`${src ? '' : `${brawler} ${player}`}`);
  return (
    <div style={{position: 'relative', aspectRatio: '1 / 1', height: `${height}`, 
                 top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }}>
        <Image src={`${src ? src : 'https://ai6j31goj4.ufs.sh/f/iNpc9vxDVhQlVE8ScBv6parfz2OgK9h5TkJ3iq48oAvU7PYd'}`} fill style={{postion: 'relative', objectFit: 'cover'}} sizes={'10vw'} alt='highlight' priority/>
    </div>
  )
}

export default BrawlerIcon;