import React from 'react'
import Image from 'next/image'

const MapImages = ({map, src, height}) => {
  return (
    <div style={{position: 'relative', width: 'auto', height: `${height}`, 
                 top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }}>
        <Image src={`${src ? src : 'https://ai6j31goj4.ufs.sh/f/iNpc9vxDVhQl7Os0JOWckSaifuL259vxF1CIbhK6lNo4wnsM'}`} 
          className='object-cover'
          fill
          style={{width: '100%', height: '100%', overflow: 'hidden', background: 'none'}} 
          sizes={'100vw'} alt='highlight' 
          priority
        />
    </div>
  )
}

export default MapImages;