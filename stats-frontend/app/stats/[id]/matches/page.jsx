import React from 'react'
import { createClient } from '@/lib/supabase/browserClient.js'
import MatchBox from '@/components/matchBox.jsx'
import MatchInfoPanel from '@/components/match-info-panel/matchInfoPanel'

const page = async ({params}) => {
    const resolvedParams = await params;
    let client = createClient();
    let { data } = await client.from('matches').select('*').eq('player_id', `#${resolvedParams.id}`);
    const data_ordered = data.reverse();
    return (
        <div className='grid grid-cols-2 gap-0' style={{maxHeight: '100%'}}>
            <MatchBox data={data_ordered}/>
            <MatchInfoPanel selectedMatch={{map: 'placeholder'}}/>
        </div>
  )
}

export default page