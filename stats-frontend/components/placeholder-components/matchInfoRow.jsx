import React from 'react'
import GridSection from '@/components/gridSection'

const MatchInfoRow = () => {
  return (
    <div className='w-full h-full grid grid-cols-[3fr_3fr_2fr_2fr]'>
        <GridSection>Stat 1</GridSection>
        <GridSection>Stat 2</GridSection>
        <GridSection>Stat 3</GridSection>
        <GridSection>Stat 4</GridSection>
    </div>
  )
}

export default MatchInfoRow