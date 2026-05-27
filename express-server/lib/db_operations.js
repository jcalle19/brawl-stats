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

const db_match_insert = async (matches) => {
    const {data, error} = await dbClient
        .from('matches')
        .insert(matches)
        .select();
    return {data, error};
}

const db_create_match_object = (player, match) => {
    const parsedTeams = parse_team_brawlers(player, match.battle.teams);
    return {
        id: `${match.battleTime}${player}`,
        mode: match.event.mode,
        brawler: parsedTeams.playerBrawler,
        result: match.battle.result,
        mvp: player === match.battle.starPlayer?.tag ? true : false,
        map: match.event.map,
        battle_time: match.battleTime,
        player_id: player,
        team1: parsedTeams.playerTeam[0],
        team2: parsedTeams.playerTeam[1],
        enemy1: parsedTeams.enemyTeam[0],
        enemy2: parsedTeams.enemyTeam[1],
        enemy3: parsedTeams.enemyTeam[2]
    };
}

const parse_team_brawlers = (targetId, teams) => {
    let playerBrawler = '';
    let friendly = [];
    let enemy = [];
    let teamsCombined = [...teams[0], ...teams[1]]
    for (const [index, player] of teamsCombined.entries()) {
        if (player.tag === targetId) {
            playerBrawler = player.brawler.name;
            if (index <= 2) {
                teams[0].splice(index, 1);
                friendly = teams[0];
                enemy = teams[1];
            } else {
                teams[1].splice(index - 3, 1);
                friendly = teams[1];
                enemy = teams[0];
            }
            break;
        }
    }
    return {
        playerBrawler: playerBrawler,
        playerTeam: friendly,
        enemyTeam: enemy,
    }
}

export const db_tools = {
    authClient,
    dbClient,
    db_select_recent_time,
    db_match_insert,
    db_create_match_object,
}