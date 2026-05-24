import dotenv from 'dotenv';
import pLimit from 'p-limit';
import { db_tools } from './lib/db_operations.js';
dotenv.config();

const limit = pLimit(25);
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
    churn_player_list(playerList);
    setTimeout(poll_player_data, 10000/*2700000*/);
}

//maybe optimize with lazy polling
const poll_untracked_matches = async () => {

    if (untrackedMatches.length > 0) {
        console.log(`inserting ${untrackedMatches.length} matches to database`)
        //let inserted = await db_tools.db_match_insert(untrackedMatches);
        //console.log(inserted.error);
        //possibly add fallback in case of failed insertion
        untrackedMatches.length = 0;
    }
    setTimeout(poll_untracked_matches, 5000);
}

const churn_player_list = async (players) => {
    return Promise.all(
        players.map(player =>
            limit(async () => {
                const battle_log = (await get_brawl_data(player)).items;
                const recentTime = await db_tools.db_select_recent_time(player);
                untrackedMatches.push(...trim_games(player, parse_battle_time(recentTime), battle_log));
                //This is where you submit the matches to database
            })
    ))
}
const connection = async (io, socket) => {
    const token = socket.handshake.auth.token;

    const { data: { user }, error } =
        await authClient.auth.getUser(token);
    //disable this
    if (error || !user) {
        socket.disconnect();
        return
    }

    // Attach user to socket
    socket.data.user = user;
    console.log('a user connected', socket.data.user.email, socket.data.user.confirmed_at);
    io.to(socket.id).emit('connected', true);
}

const get_brawl_data = async (playerId) => {
    const id = process.env.TEST_ID; //params;
    const result = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${id.replace('#', '')}/battlelog`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        },
    });
    const data = await result.json();
    return data;
}

//grab only untracked games from battlelog
const trim_games = (player, mostRecentTime, games) => {
    const untracked = [];
    let currTime;
    for(let i = 0; i < games.length; i++) {
        currTime = parse_battle_time(games[i].battleTime);
        if (true /*currTime > mostRecentTime*/) {
            untracked.push(db_tools.db_create_match_object(player, games[i]));
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
    get_brawl_data,
    parse_battle_time,
    poll_player_data,
    poll_untracked_matches,
}