import dotenv from 'dotenv';
import pLimit from 'p-limit';
import { top_config } from '#shared/worker-config.js';
import { db_tools } from '#shared/db_operations.js';
import { api_tools } from '#shared/api_operations.js';
import { helper_tools } from '#shared/helper_operations.js';
dotenv.config();

let playerList = [process.env.TEST_ID];
let playerCapReached = false;
const limit = pLimit(top_config.pLimitMax);
const untrackedMatches = [];
const matchBackup = [];

//Go through player list to determine if any players have fallen beneath masters
const poll_player_data = async () => {
    let playerList = (await db_tools.db_refresh_player_list()).data;
    playerCapReached = (playerList.length >= top_config.topPlayerCap ? true : false);
    churn_player_list(playerList);
    setTimeout(poll_player_data, top_config.playerDelayMS);
}

//maybe optimize with lazy polling
const poll_untracked_matches = async () => {
    console.log(untrackedMatches.length);
    if (untrackedMatches.length > 0 && top_config.dbInsertsOn) {
        let toDB = untrackedMatches;
        untrackedMatches.length = 0;

        console.log(`inserting ${untrackedMatches.length} matches to db`)
        let inserted = await db_tools.db_match_insert('top_player_matches', toDB);
        console.log(inserted);
    }
    setTimeout(poll_untracked_matches, top_config.matchDelayMS);
}

const churn_player_list = async (players) => {
    return Promise.all(
        players.map(player =>
            limit(async () => {
                let id = player.id;
                const battle_log = (await api_tools.get_battle_log(id)).items;
                const player_data = await api_tools.get_player_data(id);
                const recentTime = await db_tools.db_select_recent_time('top_players', id);
                untrackedMatches.push(...trim_games(id, recentTime, battle_log, player_data));
            })
    ))
}

//grab only untracked games from battlelog
const trim_games = (player, mostRecentTime, games, rank_data) => {
    const untracked = [];
    let currTime;

    let timeFmt = helper_tools.parse_battle_time(mostRecentTime);
    for(let i = 0; i < games?.length; i++) {
        currTime = helper_tools.parse_battle_time(games[i].battleTime);
        if (currTime > timeFmt) {
            if (!playerCapReached) helper_tools.add_top_players(player, games[i]);
            if (games[i].battle.type === 'soloRanked') {
                let formattedMatch = helper_tools.create_top_match_object(player, games[i], rank_data);
                untracked.push(formattedMatch);
            }
        }
        else break;
    }
    return untracked.reverse();
}

//Worker actions
poll_player_data();
poll_untracked_matches();