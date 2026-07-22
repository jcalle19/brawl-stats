import { api_tools } from '#shared/api_operations.js';
import { db_tools } from '#shared/db_operations.js';

const create_match_object = (player, match, rank_data) => {
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

const create_top_match_object = (player, match) => {
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

const parse_battle_time = (battleTime) => {
    if (battleTime === '') return '';
    const formatted = battleTime.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');
    return new Date(formatted);
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
const parse_team_validity = async (originalTag, eloCutoff, teams, battle_time) => {
    const validPlayers = [];
    let teamsCombined = [...teams[0], ...teams[1]];
    for (const player of teamsCombined) {
        if (player.tag !== originalTag) {
            //check elo, if good, then add to db
            const elo = (await api_tools.get_player_data(player.tag)).rankElo;
            //if elo is good, then add to db
            elo > eloCutoff ? validPlayers.push({id: player.tag, most_recent_match: battle_time}) : '';
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
        result = playersToAdd.length > 0 ? db_tools.db_top_players_insert(playersToAdd) : [];
    } catch (err) {
        console.log(err);
        result = [];
    }
    return result;
}

export const helper_tools = {
    create_match_object,
    create_top_match_object,
    parse_team_brawlers,
    parse_team_validity,
    parse_battle_time,
    add_top_players,
}