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

const db_match_insert = async (playerId, matches) => {
    const {data, error} = await dbClient
        .from('matches')
        .insert(matches);
    return (error ? error : data);
}

const db_create_match_object = (player, match) => {
    return {
        id: `${match.battleTime}${player}`,
        mode: match.event.mode,
        brawler: parse_player_brawler(player, match.battle.teams),
        result: match.battle.result,
        mvp: player === match.battle.starPlayer?.tag ? true : false,
        map: match.event.map,
        battle_time: match.battleTime,
        player_id: player,
    };
}

const parse_player_brawler = (targetId, teams) => {
    let teamsCombined = [...teams[0], ...teams[1]]
    for (const player of teamsCombined) {
        if (player.tag === targetId) {
            return player.brawler.name;
        }
    }
}
export const db_tools = {
    authClient,
    dbClient,
    db_select_recent_time,
    db_match_insert,
    db_create_match_object,
}