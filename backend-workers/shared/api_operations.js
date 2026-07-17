import dotenv from 'dotenv';
dotenv.config();

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

export const api_tools = {
    get_battle_log,
    get_player_data,
}