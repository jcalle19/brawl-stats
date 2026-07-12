import {useRef, useEffect} from 'react'
import { maps } from '@/public/matchURLMap.js'
import MapImages from '@/components/mapImages.jsx'
import '@/css/mapParts.css'

const MapBase = ({selectedMap}) => {
  const rotateRef = useRef(null);
  const rotateRefParent = useRef(null);
  const rotateRefInfo = useRef(null);
  const origin = useRef({x: 0, y: 0});
  const transformBefore = useRef('');
  const mapRef = useRef(null);

  const handleMouseEnter = () => {
        rotateRefInfo.current = rotateRefParent.current.getBoundingClientRect();
        transformBefore.current = rotateRef.current.style.transform;
    }

    const handleMouseMove = (e) => {
        if (rotateRefInfo.current === null) rotateRefInfo.current = rotateRefParent.current.getBoundingClientRect();
        origin.current.x = rotateRefInfo.current.left + (rotateRefInfo.current.width/2);
        origin.current.y = rotateRefInfo.current.top + (rotateRefInfo.current.height/2);
        let xCoord = e.clientX - origin.current.x;
        let yCoord = e.clientY - origin.current.y;
    
        let rotY = xCoord / (rotateRefInfo.current.width/2);
        let rotX = -1 * yCoord / (rotateRefInfo.current.height/2);

        rotateRef.current.style.transform = `rotateX(${rotX * -25}deg) rotateY(${rotY * -25}deg)`;
    }

    const handleMouseExit = () => {
        rotateRef.current.style.transform = transformBefore.current;
    }
  //<div className='map-component' id='map-image'></div>
  return (
    <div 
      id='map-base-parent'
      ref={rotateRefParent}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseExit}
    >
      <div className='w-full h-full' ref={rotateRef} style={{transformOrigin: 'center'}}>
        <div className='map-component' id='map-base'></div>
        <MapImages src={maps[selectedMap]} width={'98%'} height={'98%'} size={'20vw'}/>
      </div>
    </div>
  )
}

export default MapBase