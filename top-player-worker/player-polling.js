import dotenv from 'dotenv';
import pLimit from 'p-limit';
import { db_tools } from '../lib/db_operations.js';
dotenv.config();

const limit = pLimit(25);
const playerList = [process.env.TEST_ID];
const untrackedMatches = [];
const matchBackup = [];

/* Issues / future improvements
    - Add limit-request handling
    - optimize churn player list
    - possibly add fallback in case of failed insertion

    - For each pass of player list
        - Get next player
        - Get battlelog
        - Trim games
        - (NEW) store teammates id to add to player list if above masters with most recent time as current time
        - store each match identified by [battletime][star player id] in temporary set
        clear map after every other pass

    
*/

const poll_player_data = async () => {
    churn_player_list(playerList);
    setTimeout(poll_player_data, 10000/*2700000*/);
}

//maybe optimize with lazy polling
const poll_untracked_matches = async () => {
    if (untrackedMatches.length > 0) {
        console.log(`inserting ${untrackedMatches.length} matches to set`)
        let inserted = await db_tools.db_top_match_insert(untrackedMatches);
        console.log(inserted.error);
        untrackedMatches.length = 0;
    }
    setTimeout(poll_untracked_matches, 5000);
}

const churn_player_list = async (players) => {
    return Promise.all(
        players.map(player =>
            limit(async () => {
                const battle_log = (await get_battle_log(player)).items;
                const player_data = await get_player_data(player);
                const recentTime = await db_tools.db_select_recent_time(player);
                untrackedMatches.push(...trim_games(player, parse_battle_time(recentTime), battle_log, player_data));
            })
    ))
}

const get_battle_log = async (playerId) => {
    const id = playerId; //params;
    const result = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${id.replace('#', '')}/battlelog`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        },
    });
    try {
        const data = await result.json();
        return data;
    } catch (e) {
        console.log(e, result);
    } 
    return undefined;
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

//grab only untracked games from battlelog
const trim_games = (player, mostRecentTime, games, rank_data) => {
    const untracked = [];
    let currTime;
    for(let i = 0; i < games?.length; i++) {
        currTime = parse_battle_time(games[i].battleTime);
        if (currTime > mostRecentTime) {
            untracked.push(db_tools.db_create_top_match_object(player, games[i], rank_data));
        }
        else break;
    }
    return untracked.reverse();
}

const parse_battle_time = (battleTime) => {
    const formatted = battleTime.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');
    return new Date(formatted);
}

export const util = {
    safe,
    connection,
    get_battle_log,
    parse_battle_time,
    poll_player_data,
    poll_untracked_matches,
}