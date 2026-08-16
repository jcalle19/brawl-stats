import React from 'react'
import { createClient } from '@/lib/supabase/browserClient.js'
import MatchBox from '@/components/matchBox.jsx'
import MatchContainer from '@/components/matchContainer'
import MatchInfoPanel from '@/components/match-info-panel/matchInfoPanel'
import DefaultInfoPanel from '@/components/placeholder-commponents/defaultInfoPanel'
import MobileInfoColumns from '@/components/mobile-view/mobileInfoColumns'

const page = async ({params}) => {
    const resolvedParams = await params;
    let client = createClient();
    let { data } = await client.from('matches').select('*').eq('player_id', `#${resolvedParams.id}`).order('id', {ascending: true});
    let name = await client.from('players').select('username').eq('id', `#${resolvedParams.id}`);
    data.reverse();
    //<MatchInfoPanel selectedMatch={{map: 'placeholder'}} username={name.data[0].username}/>
    return (
        <div className='relative grid grid-cols-[1fr_3fr] [@media(max-aspect-ratio:1/1)]:grid-cols-1 gap-0 w-full h-full'>
            <div className='relative hidden [@media(max-aspect-ratio:1/1)]:block'>
                <MatchContainer data={data} mobile={true}/>
            </div>
            <div className='relative block [@media(max-aspect-ratio:1/1)]:hidden'>
                <MatchContainer data={data} mobile={false}/> 
            </div>
            <div className='relative block [@media(max-aspect-ratio:1/1)]:hidden min-h-0 h-full w-full'>
                <MatchInfoPanel style={{display: 'none'}} selectedMatch={{map: 'placeholder'}} username={name.data[0].username}/>
            </div>
            <div className='relative hidden [@media(max-aspect-ratio:1/1)]:block h-full w-full select-none overflow-hidden'>
                <MobileInfoColumns/>
            </div>
            
        </div>
  )
}

export default page 