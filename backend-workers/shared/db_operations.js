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



//  __  __ _  ____  ____  ____  ____  ____ 
// (  )(  ( \/ ___)(  __)(  _ \(_  _)/ ___)
//  )( /    /\___ \ ) _)  )   /  )(  \___ \
// (__)\_)__)(____/(____)(__\_) (__) (____/

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
        .insert(players)
        .select();
    return {data, error};
}

// ____  ____   __   ____  ____ 
//(  _ \(  __) / _\ (    \/ ___)
// )   / ) _) /    \ ) D (\___ \
//(__\_)(____)\_/\_/(____/(____/

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

export const db_tools = {
    authClient,
    dbClient,
    db_select_recent_time,
    db_match_insert,
    db_top_players_insert,
    db_refresh_player_list,
}