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
    //<MatchInfoPanel selectedMatch={{map: 'placeholder'}} username={name.data[0].username}/>
    return (
        <div className='relative gap-0 w-full h-full'>
            <div className='relative hidden [@media(max-aspect-ratio:1/1)]:block'>
                <MatchContainer data={data} mobile={true}/>
            </div>
            <SidePanelContainer data={data}/>
            <div className='relative block [@media(max-aspect-ratio:1/1)]:hidden min-h-0 h-full w-full'>
                <DefaultInfoPanel/>
            </div>
            <div className='relative hidden [@media(max-aspect-ratio:1/1)]:block h-full w-full overflow-hidden'>
                <MobileInfoColumns/>
            </div>
            
        </div>
  )
}

export default page 