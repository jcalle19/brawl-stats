import React from 'react'
import { createClient } from '@/lib/supabase/browserClient.js'
import MatchBox from '@/components/matchBox.jsx'
import MatchInfoPanel from '@/components/match-info-panel/matchInfoPanel'

const page = async ({params}) => {
    const resolvedParams = await params;
    let client = createClient();
    let { data } = await client.from('matches').select('*').eq('player_id', `#${resolvedParams.id}`).order('id', {ascending: true});
    let name = await client.from('players').select('username').eq('id', `#${resolvedParams.id}`);
    data.reverse();
    return (
        <div className='grid grid-cols-[1fr_3fr] gap-0 w-full h-full' style={{maxHeight: '100%'}}>
            <MatchBox data={data}/>
            <MatchInfoPanel selectedMatch={{map: 'placeholder'}} username={name.data[0].username}/>
        </div>
  )
}

export default page