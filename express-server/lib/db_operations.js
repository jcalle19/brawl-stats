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

const db_select_recent_time = async (playerId) => {
    const {data, error} = await dbClient
        .from('players')
        .select('most_recent_match')
        .eq('id', playerId)
        .single();
    return (data ? data.most_recent_match : error);
}

export const db_tools = {
    authClient,
    dbClient,
    db_select_recent_time,
}