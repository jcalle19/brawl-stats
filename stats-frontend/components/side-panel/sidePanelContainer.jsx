'use client'
import React from 'react'
import MatchContainer from '@/components/side-panel/matchContainer'
import PanelToggle from '@/components/side-panel/panelToggle';
import { useMatchPageContext } from '@/contexts/matchPageContext.jsx';

const SidePanelContainer = ({data}) => {
  const { sidePanelOpen } = useMatchPageContext();

  return (
    <div className={`
      ${!sidePanelOpen ? 'left-[-350px]' : 'left-0'}
      transition-left duration-200
      absolute [@media(max-aspect-ratio:1/1)]:hidden h-full w-[350px] grid grid-cols-[350px_50px]`}
    >
      <MatchContainer data={data} mobile={false}/>
      <PanelToggle/>
    </div>
  )
}

export default SidePanelContainer