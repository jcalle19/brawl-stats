import React from 'react'
import MapBase from '@/components/map-parts/mapBase'

const InfoMapColumn = ({mapName}) => {
  return (
    <div className='relative h-full max-h-full'>
        <div id='map-container' className='col-start-1 striped-bg max-h-full'>
            <div id='map-banner'>
                <div id='map-banner-text'>{mapName}</div>
            </div>
            <MapBase selectedMap={mapName}/>
        </div>
    </div>
  )
}

export default InfoMapColumn