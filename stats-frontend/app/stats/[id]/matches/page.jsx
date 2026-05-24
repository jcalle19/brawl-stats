import React from 'react'
import { createClient } from '@/lib/supabase/browserClient.js'
import StatsPage from '@/components/statsPage.jsx'
import MatchBanner from '@/components/matchBanner.jsx'

const page = async ({params}) => {
    const resolvedParams = await params;
    let client = createClient();
    const { data } = await client.from('matches').select('*').eq('player_id', `#${resolvedParams.id}`);
    console.log(data);
    return (
        <div>{resolvedParams.id}
            <MatchBanner/>
        </div>
  )
}

export default page