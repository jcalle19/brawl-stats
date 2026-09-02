import React from 'react'
import { useMatchPageContext } from '@/contexts/matchPageContext.jsx';

const PanelToggle = () => {
    const { sidePanelOpen, setSidePanelOpen } = useMatchPageContext();
    return (
        <div className='w-full aspect-square green z-1000 pointer-events-auto' onClick={()=>setSidePanelOpen(!sidePanelOpen)}></div>
    )
}

export default PanelToggle