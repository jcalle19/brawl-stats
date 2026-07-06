import React from 'react'
import Image from 'next/image'

const MapImages = ({map, src, width, height}) => {
  return (
    <div style={{position: 'relative', width: `${src ? width : '75%'}`, height: `${src ? height : '50%'}`, 
                 top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
                }}>
        <Image src={`${src ? src : '/missing_asset.png'}`} 
          className={`object-cover map-image ${src ? 'grey-border' : ''}`}
          style={{ overflow: 'hidden', background: 'none'}} 
          sizes={'100vw'} alt='highlight' 
          fill
          priority
        />
    </div>
  )
}

export default MapImages;