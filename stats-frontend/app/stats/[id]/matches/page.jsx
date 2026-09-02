import React from 'react'
import { createClient } from '@/lib/supabase/browserClient.js'
import SidePanelContainer from '@/components/side-panel/sidePanelContainer'
import MatchStatsPlane from '@/components/3d-components/matchStatsPlane'
import Block from '@/components/3d-components/block'
const page = async ({params}) => {
    const resolvedParams = await params;
    let client = createClient();
    let { data } = await client.from('matches').select('*').eq('player_id', `#${resolvedParams.id}`).order('id', {ascending: true});
    let name = await client.from('players').select('username').eq('id', `#${resolvedParams.id}`);
    let xDeg='55'; //55
    let yDeg='0'; //0
    let zDeg='0'; //25
    data.reverse();
    //translation specifically chosen <MatchStatsPlane xDeg={xDeg} yDeg={yDeg} zDeg={zDeg}/>
    return (
        <div className='relative-center md:grid md:grid-cols-[350px_auto] gap-0 w-full h-full transform-3d pointer-events-none'>
            <SidePanelContainer data={data}/>
            <div className='relative w-full h-full tranform-3d grid grid-rows-2 md:grid-rows-1 md:grid-cols-[5fr_2fr] overflow-y-auto'>
                <MatchStatsPlane data={data}/>
                <div className='test-border'></div>
            </div>
        </div>
  )
}

export default page 