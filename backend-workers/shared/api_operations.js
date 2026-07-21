import dotenv from 'dotenv';
dotenv.config();

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

//courtesy of chatgpt
const rate_limit_handler = async (retry, result, attempt=0) => {
    if (attempt >= 8) {
        throw new Error("Maximum retries exceeded");
    }
    if (result.status === 429) {
        console.log('retrying');
        const wait = Math.min(1000 * 2 ** attempt, 30000);
        await delay(wait);
        return retry();
    }

    if (!result.ok) {
        console.log(`HTTP ${result.status}`);
        return undefined;
    }
    return (await result.json());
}

const get_battle_log = async (playerId, attempt=0) => {
    const result = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${playerId.replace('#', '')}/battlelog`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        },
    });
    try {
        //const data = await result.json();
        //return data;
        return rate_limit_handler(()=>get_battle_log(playerId, attempt+1), result);
    } catch (e) {
        console.log(e, result);
    } 
    return undefined;
}


const get_player_data = async (playerId, attempt=0) => {
    const result = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${playerId.replace('#', '')}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        },
    });
    try {
        console.log(`https://bsproxy.royaleapi.dev/v1/players/%23${playerId.replace('#', '')}`, 'here');
        //const data = await result.json();
        const data = await rate_limit_handler(()=>get_player_data(playerId, attempt+1), result);
        const packagedData = { 
            rankValue: data?.rankedRank, 
            rankName: data?.rankedRankName, 
            rankElo: data?.rankedElo,
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