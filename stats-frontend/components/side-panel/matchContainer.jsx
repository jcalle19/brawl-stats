'use client'
import React from 'react'
import MatchBanner from '@/components/side-panel/matchBanner.jsx';
import { useMatchPageContext } from '@/contexts/matchPageContext.jsx';
//add this to a potential config file
const matchesPerPage = 6;

const MatchContainer = ({data, mobile}) => {
    const { currPage, setCurrPage, matchBoxOpen } = useMatchPageContext();
    const maxPage = Math.ceil(data.length / matchesPerPage);
    const slicedData = data.slice(currPage * matchesPerPage, currPage * matchesPerPage + matchesPerPage);
    
    const pageDown = () => {
        setCurrPage(prev => (prev > 0) ? prev - 1 : prev);
    }
    
    const pageUp = () => {
        setCurrPage(prev => (prev < maxPage - 1) ? prev + 1 : prev);
        console.log('hi');
    }

    return (
        <div className={`${mobile && matchBoxOpen ? 'hidden' : '' } relative w-full h-[100vh] grid grid-rows-[19fr_1fr] z-10000`}>
            <div className='relative matchbox-parent w-full h-full striped-bg pt-4 pl-5 pr-5 pb-5'>
                {
                    slicedData.map((item, index) => 
                        <div key={item.id} style={{marginBottom: '8px'}}>
                            <MatchBanner matchData={item} rankDelta={item.elo_value_snapshot - data[(index+1 < data.length ? index + 1 : 0)].elo_value_snapshot}/>
                        </div>
                    )
                }
                
            </div>
            <div className='aboslute bottom-0 left-0 h-full w-full grid grid-cols-3 purple font-bold z-10000' >
                <div className='relative page-arrow w-full h-full' onClick={()=>pageDown()}>
                    <div className='absolute-center select-none'>{'<'}</div>
                </div>
                <div id='page-num' className='relative purple rounded-none! w-full h-full text-xl'>
                    <div className='absolute-center select-none'>{currPage + 1} / {maxPage}</div>
                </div>
                <div className='relative page-arrow w-full h-full' onClick={()=>pageUp()}>
                    <div className='absolute-center select-none'>{'>'}</div>
                </div>
            </div>
        </div>
    )
}

export default MatchContainer