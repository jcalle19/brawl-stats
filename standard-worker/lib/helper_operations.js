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

const db_create_match_object = (player, match, rank_data) => {
    const parsedTeams = parse_team_brawlers(player, match.battle.teams);
    return {
        id: `${match.battleTime}${player}`,
        mode: match.event.mode,
        brawler: parsedTeams.playerBrawler,
        result: match.battle.result,
        mvp: player === match.battle.starPlayer?.tag ? true : false,
        map: match.event.map,
        battle_time: match.battleTime,
        duration: match.battle.duration,
        player_id: player,
        team1: parsedTeams.playerTeam[0],
        team2: parsedTeams.playerTeam[1],
        enemy1: parsedTeams.enemyTeam[0],
        enemy2: parsedTeams.enemyTeam[1],
        enemy3: parsedTeams.enemyTeam[2],
        rank_value_snapshot: rank_data.rankValue,
        elo_value_snapshot: rank_data.rankElo
    };
}

const db_select_top_recent_time = async (playerId) => {
    const {data, error} = await dbClient
        .from('top_players')
        .select('most_recent_match')
        .eq('id', playerId)
        .single();
    return (data ? data.most_recent_match : error);
}
/*
const { error } = await supabase
  .from("matches")
  .upsert(matches, {
    onConflict: "match_id",
    ignoreDuplicates: true,
  });
*/
const db_top_match_insert = async (matches) => {
    const {error} = await dbClient
        .from('top_player_matches')
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

const db_create_top_match_object = (player, match) => {
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
    };
}

const get_player_data = async (playerId) => {
    const id = playerId;
    const result = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${id.replace('#', '')}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        },
    });
    try {
        const data = await result.json();
        const packagedData = { 
            rankValue: data.rankedRank, 
            rankName: data.rankedRankName, 
            rankElo: data.rankedElo,
            /*seasonHighRankValue: data.highestSeasonRankedRank, 
            seasonHighRankName: data.highestSeasonRankedRankName, 
            seasonHighRankElo: data.highestSeasonRankedElo,
            highestRankValue: data.highestAllTimeRankedRank, 
            highestRankName: data.highestAllTimeRankedRankName, 
            highestRankElo: data.highestAllTimeRankedElo,*/
        };
        return packagedData;
    } catch (e) {
        console.log(e, result);
    } 
    return undefined;
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

//replace elo cutoff
const parse_team_validity = async (originalTag, teams, battle_time) => {
    const validPlayers = [];
    let teamsCombined = [...teams[0], ...teams[1]];
    for (const player of teamsCombined) {
        if (player.tag !== originalTag) {
            //check elo, if good, then add to db
            const elo = (await get_player_data(player.tag)).rankElo;
            //if elo is good, then add to db
            elo > 8250 ? validPlayers.push({id: player.tag, most_recent_match: battle_time}) : '';
        }
    }
    return validPlayers
}

//check this one
const add_top_players = async (player, matchData) => {
    let playersToAdd;
    let result
    try {
        console.log(matchData);
        playersToAdd = await parse_team_validity(player, matchData.battle.teams, matchData.battleTime);
        result = playersToAdd.length > 0 ? db_top_players_insert(playersToAdd) : [];
    } catch (err) {
        console.log(err);
        result = [];
    }
    
    
    return result;
}

const refresh_player_list = async () => {
    const {data, error} = await dbClient
        .from('top_players')
        .select('id');
    return {data, error};
}

export const helper_tools = {
    authClient,
    dbClient,
    db_select_recent_time,
    db_match_insert,
    db_create_match_object,
    db_select_top_recent_time,
    db_top_match_insert,
    db_top_players_insert,
    get_player_data,
    db_create_top_match_object,
    parse_team_validity,
    add_top_players,
    refresh_player_list,
}