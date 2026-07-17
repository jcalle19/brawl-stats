import dotenv from 'dotenv';
import pLimit from 'p-limit';
import { settings } from './worker-config.js';
import { helper_tools } from '../standard-worker/lib/helper_operations.js';
dotenv.config();

let playerList = [process.env.TEST_ID];
let playerCapReached = false;
const limit = pLimit(settings.pLimitMax);
const untrackedMatches = [];
const matchBackup = [];

/* Issues / future improvements
    - Add limit-request handling
    - optimize churn player list
    - possibly add fallback in case of failed insertion
    - Dynamically calculate elo requirement due to lower elo at beginning of season

    - Lower level description
        churn_player_list :
        ^   get_player_data (elo, rank name, etc),
        |   get_recent_time (most recent match logged),
        |   get_battle_log (complete list of last 25 matches) -> 
        |       trim_games (remove games before recent time) -+
        |                                                     |
        +------------------------------------------untrackedMatches(updated) -> poll_untracked_matches 
                                                              ^                           |
                                                              |___________________________|
*/

//Go through player list to determine if any players have fallen beneath masters
const poll_player_data = async () => {
    let playerList = (await helper_tools.refresh_player_list()).data;
    playerCapReached = (playerList.length >= settings.topPlayerCap ? true : false);
    churn_player_list(playerList);
    setTimeout(poll_player_data, settings.playerDelayMS);
}

//maybe optimize with lazy polling
const poll_untracked_matches = async () => {
    if (untrackedMatches.length > 0) {
        let toDB = untrackedMatches;
        untrackedMatches.length = 0;

        console.log(`inserting ${untrackedMatches.length} matches to db`)
        let inserted = await helper_tools.db_top_match_insert(toDB);
        console.log(inserted);
    }
    setTimeout(poll_untracked_matches, settings.matchDelayMS);
}

const churn_player_list = async (players) => {
    return Promise.all(
        players.map(player =>
            limit(async () => {
                let id = player.id;
                const battle_log = (await get_battle_log(id)).items;
                const player_data = await helper_tools.get_player_data(id);
                const recentTime = await helper_tools.db_select_top_recent_time(id);
                untrackedMatches.push(...trim_games(id, parse_battle_time(recentTime), battle_log, player_data));
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

//grab only untracked games from battlelog
const trim_games = (player, mostRecentTime, games, rank_data) => {
    const untracked = [];
    let currTime;
    for(let i = 0; i < games?.length; i++) {
        currTime = parse_battle_time(games[i].battleTime);
        if (currTime > mostRecentTime) {
            if (!playerCapReached) helper_tools.add_top_players(player, games[i]);
            if (games[i].battle.type === 'soloRanked') {
                let formattedMatch = helper_tools.db_create_top_match_object(player, games[i], rank_data);
                untracked.push(formattedMatch);
            }
        }
        else break;
    }
    return untracked.reverse();
}

const parse_battle_time = (battleTime) => {
    const formatted = battleTime.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');
    return new Date(formatted);
}

//Worker actions
poll_player_data();
poll_untracked_matches();