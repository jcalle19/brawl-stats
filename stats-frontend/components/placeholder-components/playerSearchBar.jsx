import React from 'react'
import GridSection from '@/components/gridSection'
const SearchBar = () => {
  return (
    <div className={`h-full w-full grid grid-cols-[3fr_1fr] rounded`} style={{outline: '1px solid white'}}>
        <input
            type="text"
            className='stats-bg w-full h-full'
            placeholder='Enter Player Id'
        />
        <GridSection classes={'purple'}>
            <div className='relative-center small-text'>
                {'>'}
            </div>
        </GridSection>
    </div>
  )
}

export default SearchBar