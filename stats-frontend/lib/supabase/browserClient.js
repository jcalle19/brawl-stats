import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )
}

export const retrieve_all_stats = async (matchData) => {
  let client = createClient();
  const {data, error} = await client.rpc('retrieve_match_stats', {
      matchdata: matchData
  });
  return { data, error };
}

export async function fetchBrawlerData(matchData) {
  console.log(matchData);
  let client = createClient();
  try {
    let brawlerData = await client.from('player_brawler_info')
      .select('brawler, wins, losses, mvps')
      .eq('player_id', matchData.player_id)
      .eq('brawler', matchData.brawler)
      .eq('map', matchData.map)
      .single();
    return brawlerData;
  } catch (e) {
    return 0;
  }
  
}

//optimize to just grab wnirate
export async function fetchMapData(matchData) {
  let client = createClient();
  try {
    let mapData = await client.from('player_map_info')
      .select('wins, losses, mvps')
      .eq('player_id', matchData.player_id)
      .eq('map', matchData.map)
      .single();
    return mapData;
  } catch (e) {
    return 0;
  }
}

export async function fetchModeData(matchData) {
  let client = createClient();
  try {
    let modeData = await client.from('player_brawler_info')
      .select('wins, losses, mvps')
      .eq('brawler', matchData.brawler)
      .eq('mode', matchData.mode);
    return modeData;
  } catch (e) {
    return 0;
  }
}

//top map(brawler) winrate
export async function fetchTopMapWinrate(matchData) {
  let client = createClient();
  let ret;
  try {
    let stats = await client.from('top_brawler_info')
      .select('win_rate')
      .eq('brawler', matchData.brawler)
      .eq('map', matchData.map);
    ret = stats.data.win_rate.toFixed(4);
  } catch (e) {
    ret = 0;
  }
  
  return ret;
}

//top mode(brawler) winrate, all maps
export async function fetchTopModeWinrate(matchData) {
  let client = createClient();
  let ret;
  try {
    let stats = await client.from('top_brawler_info')
      .select('win_rate')
      .eq('brawler', matchData.brawler)
      .eq('mode', matchData.mode);
    ret = stats.data.reduce((sum, num) => sum + num.win_rate, 0) / stats.data.length;
  } catch (e) {
    ret = 0;
  }
  
  return ret;
}

//top mode(brawler) pickrate
export async function fetchTopModePickrate(matchData) {
  let client = createClient();
  let ret;
  try {
    let totalGames = (await client.from('top_brawler_info')
      .select('wins, losses')
      .eq('mode', matchData.mode)).data?.length;
    let brawlerGames = (await client.from('top_brawler_info')
      .select('wins, losses')
      .eq('brawler', matchData.brawler)
      .eq('mode', matchData.mode)).data?.length;
    ret = (brawlerGames / totalGames).toFixed(4);
  } catch (e) {
    ret = 0;
  }
  
  return ret;
}



//top map(brawler) pickrate
export async function fetchTopMapPickrate(matchData) {
  let client = createClient();
  let ret;
  try {
    let totalGames = (await client.from('top_brawler_info')
        .select('wins, losses')
        .eq('map', matchData.map)).data?.length;
    let brawlerGames = (await client.from('top_brawler_info')
        .select('wins, losses')
        .eq('brawler', matchData.brawler)
        .eq('map', matchData.map)).data?.length;
    ret = (brawlerGames / totalGames).toFixed(4);
  } catch (e) {
    ret = 0;
  }
  return ret;
}
    
export const client_tools = {
  fetchBrawlerData,
  fetchMapData,
  fetchModeData,
  fetchTopMapWinrate,
  fetchTopMapPickrate,
  fetchTopModeWinrate,
  fetchTopModePickrate,
}