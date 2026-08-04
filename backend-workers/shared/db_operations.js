import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const authClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const dbClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

//Inserts

const db_match_insert = async (table, matches) => {
    const {error} = await dbClient
        .from(table)
        .upsert(matches, {
            onConflict: "id",
            ignoreDuplicates: true,
        })
        .select();
    return error;
}

const db_top_players_insert = async (players) => {
    const {data, error} = await dbClient
        .from('top_players')
        .upsert(players, {
            onConflict: "id",
            ignoreDuplicates: true,
        })
        .select();
    return {data, error};
}

//Updates
const db_update_top_brawlers = async (matches) => {
    const {data, error} = await dbClient.rpc('update_top_brawler_stats', {
        match_array: matches
    });
    console.log(error);
    return { data, error};
}

//Reads

const db_select_recent_time = async (table, playerId) => {
    const {data, error} = await dbClient
        .from(table)
        .select('most_recent_match')
        .eq('id', playerId)
        .single();
    return (data ? data.most_recent_match : error);
}

const db_refresh_player_list = async () => {
    const {data, error} = await dbClient
        .from('top_players')
        .select('id');
    return {data, error};
}

//Deletes
const db_old_season_cleanup = async (season) => {
    const {data, error} = await dbClient.rpc('delete_old_season_data', {
        current_season: season
    });
    return { data, error };
}

export const db_tools = {
    authClient,
    dbClient,
    db_old_season_cleanup,
    db_update_top_brawlers,
    db_select_recent_time,
    db_match_insert,
    db_top_players_insert,
    db_refresh_player_list,
}