import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )
}

export async function fetchBrawlerData(matchData) {
  let client = createClient();
  let brawlerData = await client.from('player_brawler_info')
                          .select('brawler, wins, losses, mvps')
                          .eq('player_id', matchData.player_id)
                          .eq('brawler', matchData.brawler)
                          .eq('mode', matchData.mode)
                          .eq('map', matchData.map)
                          .single();
  return brawlerData;
}

export async function fetchMapData(matchData) {
  let client = createClient();
  let mapData = await client.from('player_map_info')
                          .select('wins, losses, mvps')
                          .eq('player_id', matchData.player_id)
                          .eq('map', matchData.map)
                          .single();
  return mapData;
}


        