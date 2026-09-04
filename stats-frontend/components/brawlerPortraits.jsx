import React from 'react'
import Image from 'next/image'

const BrawlerPortraits = ({src, size, overflow}) => {
  return (
    <div className='relative w-full h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <Image src={`${src ? src : '/missing_asset.png'}`} 
          className='object-contain object-left'
          fill
          quality={100}
          style={{height: '100%', overflow: `${overflow ? 'visible' : 'hidden'}`, background: 'none'}} 
          sizes={size} alt='highlight' 
          priority
        />
    </div>
  )
}

export default BrawlerPortraits;