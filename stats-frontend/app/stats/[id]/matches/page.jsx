import React from 'react'
import { createClient } from '@/lib/supabase/browserClient.js'
import MatchContainer from '@/components/side-panel/matchContainer'
import MatchInfoPanel from '@/components/match-info-panel/matchInfoPanel'
import SidePanelContainer from '@/components/side-panel/sidePanelContainer'
import DefaultInfoPanel from '@/components/placeholder-components/defaultInfoPanel'
import MobileInfoColumns from '@/components/mobile-view/mobileInfoColumns'
import BlockPlane from '@/components/3d-components/blockPlane'
import Block from '@/components/3d-components/block'

const page = async ({params}) => {
    const resolvedParams = await params;
    let client = createClient();
    let { data } = await client.from('matches').select('*').eq('player_id', `#${resolvedParams.id}`).order('id', {ascending: true});
    let name = await client.from('players').select('username').eq('id', `#${resolvedParams.id}`);
    data.reverse();

    return (
        <div className='relative-center  gap-0 w-full h-full'>
            <SidePanelContainer data={data}/>
            <BlockPlane width={'200px'} height={'200px'} xDeg={'55'} yDeg={'0'} zDeg={'55'}>
                <Block blockHeight={'75px'}/>
            </BlockPlane>
        </div>
  )
}

export default page 