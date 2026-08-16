'use client'
import {useEffect} from 'react'
import { useMatchPageContext } from '@/contexts/matchPageContext'

const MobileMenuBanner = () => {
    const { matchBoxOpen, setMatchBoxOpen } = useMatchPageContext();
    //()=>setMatchBoxOpen(!matchBoxOpen)
    useEffect(()=>{
        console.log(matchBoxOpen);
    },[matchBoxOpen]);
    return (
        <div className='fixed left-0 top-0 w-full h-[55px] grid grid-cols-[3fr_1fr] z-100' style={{background: 'orange'}}>
            <div>Search bar</div>
            <div style={{background: 'blue'}} onClick={()=>setMatchBoxOpen(!matchBoxOpen)}></div>
        </div>
  )
}

export default MobileMenuBanner