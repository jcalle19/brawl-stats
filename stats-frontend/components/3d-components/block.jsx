'use client'
import {useState} from 'react'

const Block = ({children, blockHeight, color}) => {
    const [visible, updateVisibility] = useState(false);

    return (
        <div className='ui-block absolute w-full h-full transform-3d pointer-events-auto'  onMouseEnter={()=>{updateVisibility(true)}}
                 onMouseLeave={()=>{updateVisibility(false)}}>
            <div className={`${color} absolute w-full h-full left-0 transform-3d overflow-hidden`} 
                 style={{border: '1px solid black', outline: '1px solid black'}}>
                {children}
            </div>
            <div className={`absolute left-face ${visible ? 'fade-in' : 'hidden'}`} style={{
                    right: '100%',
                    transformOrigin: 'right',
                    transform: `rotateY(-90deg)`,
                    width: blockHeight,
                    height: '100%',
                }}
            ></div>
            <div className={`absolute front-face purple ${visible ? 'fade-in' : 'hidden'}`} style={{
                    top: '100%',
                    transformOrigin: 'top',
                    transform: `rotateX(-90deg)`,
                    width: '100%',
                    height: blockHeight,
                }}
            ></div>
            <div className={`absolute left-face green ${visible ? 'hidden' : 'fade-in'}`} style={{
                    right: '100%',
                    transformOrigin: 'right',
                    transform: `rotateY(-90deg)`,
                    width: '20px',
                    height: '100%',
                }}
            ></div>
            <div className={`absolute front-face green ${visible ? 'hidden' : 'fade-in'}`} style={{
                    top: '100%',
                    transformOrigin: 'top',
                    transform: `rotateX(-90deg)`,
                    width: '100%',
                    height: '20px',
                }}
            ></div>
        </div>
  )
}

export default Block