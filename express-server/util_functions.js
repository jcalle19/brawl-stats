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

const safe = (handler) => {
    return async (...args) => {
        try {
            await handler(...args);
        } catch (err) {
            console.error('Socket handler error:', err);
        }
    };
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

export const util = {
    dbClient,
    authClient,
    safe,
    connection,
}