import React from 'react'
import { createClient } from '@/lib/supabase/browserClient.js'
import SidePanelContainer from '@/components/side-panel/sidePanelContainer'
import MatchInfoPanel from '@/components/3d-components/matchInfoPlane'
import EloPanel from '@/components/3d-components/eloPanel'

const page = async ({params}) => {
    const resolvedParams = await params;
    let client = createClient();
    let { data } = await client.from('matches').select('*').eq('player_id', `#${resolvedParams.id}`).order('id', {ascending: true});
    let name = await client.from('players').select('username').eq('id', `#${resolvedParams.id}`);
    let xDeg='62';
    let yDeg='0';
    let zDeg='45';
    data.reverse();

    return (
        <div className='relative-center md:grid md:grid-cols-[350px_auto] gap-0 w-full h-full overflow-hidden'>
            <SidePanelContainer data={data}/>
            <div className='absolute md:left-[350px] w-full h-full'>
                <div className='relative w-[100%] md:w-[75%] aspect-square left-[-50%] md:left-[-37.5%]' style={{transform: 'translateY(-56.4%)'}}>
                    <MatchInfoPanel xDeg={xDeg} yDeg={yDeg} zDeg={zDeg}/>
                </div>
            </div>
            <div className='absolute md:left-[350px] w-full h-full'>
                <div className='relative w-full md:w-[120%] aspect-square top-full left-[50%] md:left-[25%]' style={{border: '10px solid red', transform: 'translateY(-50%)'}}>
                    <EloPanel xDeg={xDeg} yDeg={yDeg} zDeg={zDeg}/>
                </div>
            </div>
        </div>
  )
}

export default page 