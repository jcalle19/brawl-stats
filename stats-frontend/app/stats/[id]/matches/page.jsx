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
    let xDeg='25';
    let yDeg='15';
    let zDeg='-7';
    data.reverse();
    //translation specifically chosen <MatchStatsPlane xDeg={xDeg} yDeg={yDeg} zDeg={zDeg}/>
    return (
        <div className='relative-center md:grid md:grid-cols-[350px_auto] gap-0 w-full h-full overflow-hidden transform-3d'>
            <SidePanelContainer data={data}/>
            <MatchStatsPlane xDeg={xDeg} yDeg={yDeg} zDeg={zDeg}/>
        </div>
  )
}

export default page 