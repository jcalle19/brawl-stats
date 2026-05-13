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

let recentTime = '20260511T172413.000Z';
let i = 0;
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
    console.log('polling', i); i++;
    let battle_log = await get_brawl_data();
    console.log(trim_games(parse_battle_time(recentTime), battle_log.items).length); //replace with db insertion
    setTimeout(poll_player_data, 100000/*2700000*/);
}

const connection = async (io, socket) => {
    const token = socket.handshake.auth.token;

    const { data: { user }, error } =
        await authClient.auth.getUser(token);

    if (error || !user) {
        socket.disconnect();
        return
    }

    // Attach user to socket
    socket.data.user = user;
    console.log('a user connected', socket.data.user.email, socket.data.user.confirmed_at);
    io.to(socket.id).emit('connected', true);
}

const db_insertion = async (id, newInfo, temp_cards) => {
    const { error } = await dbClient.from('cards')
        .insert({
            user_id: id,
            attributes: newInfo,
            value: Math.floor(Math.random() * 100000) + 1,
            chance: 0,
        });
    if (error) console.log(error);
    temp_cards.length = 0;
}

const get_brawl_data = async () => {
    const id = process.env.TEST_ID; //params;
    const result = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${id}/battlelog`, {
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
const trim_games = (mostRecentTime, games) => {
    const untracked = [];
    let currTime;
    for(let i = 0; i < games.length; i++) {
        currTime = parse_battle_time(games[i].battleTime);
        if (currTime > mostRecentTime) untracked.push(games[i]);
        else break;
    }
    if (untracked[0]) recentTime = untracked[0].battleTime; //replace with db query to get players.id.mostrecent
    return untracked;
}

const parse_battle_time = (battleTime) => {
    //let battleTime = '20260510T120000.000Z';
    const formatted = battleTime.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');
    return new Date(formatted);
}

export const util = {
    dbClient,
    authClient,
    safe,
    connection,
    get_brawl_data,
    parse_battle_time,
    poll_player_data,
}