import { util } from './util_functions.js';

export const socket_functions = (io) => {
    util.poll_player_data();
    
    io.on('connection', (socket) => {
        const temp_cards = [];

        util.connection(io, socket);

        /*
        socket.on('do_thing', util.safe(()=>{
            util.do_thing(io, socket);
        }));
        */
    });

    
}