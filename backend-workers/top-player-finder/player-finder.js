import dotenv from 'dotenv';
import pLimit from 'p-limit';
import { db_tools } from '#shared/db_operations.js';
import { api_tools } from '#shared/api_operations.js';
dotenv.config();

const limit = pLimit(20);
let playerList = [];
const validPlayerList = new Map([]);
const newPlayers = new Map([]);
const invalidPlayers = new Map([]);
const highestEloPlayer = {tag: '', rankElo: 0, rankValue: 0};
let startingMatches = [];

const fetch_top_players = async () => {
    const result = await fetch(`https://bsproxy.royaleapi.dev/v1/rankings/global/players?limit=200`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        },
    });
    try {
        const data = await result.json();
        playerList = data.items;
    } catch (e) {
        console.log(e, result);
    } 
}

const churn_leaderboard = async () => {
    return Promise.all(
        playerList.map(player =>
            limit(async () => {
                const player_data = await api_tools.get_player_data(player.tag);
                if (player_data.rankElo > highestEloPlayer.rankElo) {
                    highestEloPlayer.tag = player.tag;
                    highestEloPlayer.rankElo = player_data.rankElo;
                    highestEloPlayer.rankValue = player_data.rankValue;
                }
            })
    ))
}

//potentally add more concurrency, inside of if statement run parallel for each player
const parse_team_validity = async (originalTag, players, battle_time) => {
    try {
        //let teamsCombined = [...teams[0], ...teams[1]];
        return Promise.all(
            players.map(async player => 
                limit(async () =>
                    evaluate_player(originalTag, player)
                )  
            )
        );
    } catch(err) {
        return;
    }
    
}

const evaluate_player = async (originalTag, player) => {
    if (player.tag !== originalTag && !newPlayers.has(player.tag) && !invalidPlayers.has(player.tag)) {
        const stats = await api_tools.get_player_data(player.tag);
        if (stats.rankElo >= highestEloPlayer.rankElo - 2000 || stats.rankValue >= 19) {
            validPlayerList.set(player.tag, stats);
            newPlayers.set(player.tag, stats);
        } else {invalidPlayers.set(player.tag, stats)};
    }
}

const parse_top_matches = async (tag) => {
    startingMatches = (await api_tools.get_battle_log(tag)).items;
    try {
        return Promise.all(
            startingMatches.map(async match => {
                try {
                    if (match.battle.teams) {
                        return parse_team_validity(tag, [...match.battle.teams[0], ...match.battle.teams[1]], match.battleTime);
                    } else if (match.battle.players) {
                        return parse_team_validity(tag, match.battle.players);
                    }
                } catch (err) {
                    console.log('invalid match type', match);
                }
            })
        )
    } catch (err) {
        console.log(tag, startingMatches);
    }
}

const populate_player_list = async () => {
    let tags = [...newPlayers.keys()];
    return Promise.all(
        tags.map(async tag => {
            await parse_top_matches(tag)
            newPlayers.delete(tag);
        })
    );
}

//runs once per day
const run = async () => {
    //Worker actions
    await fetch_top_players();
    await churn_leaderboard();
    newPlayers.set(highestEloPlayer.tag, {rankElo: highestEloPlayer.rankElo, rankValue: highestEloPlayer.rankValue});

    while (validPlayerList.size <= 200) {
        await populate_player_list();
    }

    let players = [...validPlayerList.keys()].map(id => ({
        id: id,
        most_recent_match: ''
    }));
    if (players.length <= 500) await db_tools.db_top_players_insert(players);
    else await db_tools.db_top_players_insert(players.slice(0,500));

    //Routine table cleanup to remove old season data
    db_tools.db_old_season_cleanup(api_tools.rankedSeason);
}

run();