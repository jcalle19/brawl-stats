import dotenv from 'dotenv';
import pLimit from 'p-limit';
import { standard_config } from '#shared/worker-config.js';
import { db_tools } from '#shared/db_operations.js';
import { api_tools } from '#shared/api_operations.js';
import { helper_tools } from '#shared/helper_operations.js';
dotenv.config();

const limit = pLimit(standard_config.pLimitMax);
const playerList = [process.env.TEST_ID];
const untrackedMatches = [];
const matchBackup = [];

const safe = (handler) => {
    return async (...args) => {
        try {
            await handler(...args);
        } catch (err) {
            console.error('Socket handler error:', err);
        }
    };
}

const poll_player_data = async () => {
    //need to refresh database here
    churn_player_list(playerList);
    setTimeout(poll_player_data, standard_config.playerDelayMS);
}

const poll_untracked_matches = async () => {
    let inserted;
    if (untrackedMatches.length > 0 && untrackedMatches.length < 200 && standard_config.dbInsertsOn) {
        let toDB = [...untrackedMatches];
        untrackedMatches.length = 0;
        console.log(`inserting ${toDB.length} matches to database`)
        await db_tools.db_match_insert('matches', toDB);
    }
    setTimeout(poll_untracked_matches, standard_config.matchDelayMS);
}

const churn_player_list = async (players) => {
    return Promise.all(
        players.map(player =>
            limit(async () => {
                const battle_log = (await api_tools.get_battle_log(player)).items;
                const player_data = await api_tools.get_player_data(player);
                const recentTime = await db_tools.db_select_recent_time('players', player);
                untrackedMatches.push(...trim_games(player, recentTime, battle_log, player_data));
                if (untrackedMatches.length >= 200) {
                    console.log(untrackedMatches.length);
                    let toDB = [...untrackedMatches];
                    untrackedMatches.length = 0;
                    db_tools.db_match_insert('matches', toDB);
                }
            })
    ))
}

//Slightly different from player-polling.js counterpart
const trim_games = (player, mostRecentTime, games, rank_data) => {
    const untracked = [];
    let currTime;

    let timeFmt = helper_tools.parse_battle_time(mostRecentTime);
    for(let i = 0; i < games?.length; i++) {
        currTime = helper_tools.parse_battle_time(games[i].battleTime);
        if (currTime > timeFmt) {
            untracked.push(helper_tools.create_match_object(player, games[i], rank_data));
            if (games[i].battle.type === 'soloRanked') {
                let formattedMatch = helper_tools.create_top_match_object(player, games[i]);
                untracked.push(formattedMatch);
            }
        }
        else break;
    }
    return untracked.reverse();
}

export const util = {
    safe,
    poll_player_data,
    poll_untracked_matches,
}