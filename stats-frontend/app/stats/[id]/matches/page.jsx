import React from 'react'
import { createClient } from '@/lib/supabase/browserClient.js'
import MatchContainer from '@/components/side-panel/matchContainer'
import MatchInfoPanel from '@/components/match-info-panel/matchInfoPanel'
import SidePanelContainer from '@/components/side-panel/sidePanelContainer'
import DefaultInfoPanel from '@/components/placeholder-components/defaultInfoPanel'
import MobileInfoColumns from '@/components/mobile-view/mobileInfoColumns'

const page = async ({params}) => {
    const resolvedParams = await params;
    let client = createClient();
    let { data } = await client.from('matches').select('*').eq('player_id', `#${resolvedParams.id}`).order('id', {ascending: true});
    let name = await client.from('players').select('username').eq('id', `#${resolvedParams.id}`);
    data.reverse();

    return (
        <div className='relative gap-0 w-full h-full'>
            <SidePanelContainer data={data}/>
            <DefaultInfoPanel/>
        </div>
  )
}

export default page 