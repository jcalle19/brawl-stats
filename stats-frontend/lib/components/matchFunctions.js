import Chart from 'chart.js/auto';

export function bundledStats(brawlerData, mapData) {
    return {
        brawlerTotalGames: brawlerData.data.wins + brawlerData.data.losses, 
        brawlerWL: brawlerData.data.wins / (brawlerData.data.wins + brawlerData.data.losses),
        brawlerWins: brawlerData.data.wins,
        brawlerLosses: brawlerData.data.losses,
        brawlerMVP: brawlerData.data.mvps,
        mapTotalGames: mapData.data.wins + mapData.data.losses,
        mapWins: mapData.data.wins,
        mapLosses: mapData.data.losses,
        mapWL: mapData.data.wins / (mapData.data.wins + mapData.data.losses),
        mapMVP: mapData.data.mvps
    }
}

export const parse_battle_time = (battleTime) => {
    const formatted = battleTime?.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');
    let date = new Date(formatted);
    return {
        time: `${date.getHours()}:${date.getMinutes()}`,
        date: `${date.getMonth() + 1} / ${date.getDate()}`
    }
}

export const parse_battle_duration = (duration) => {
    return `${Math.floor(duration / 60)}:${duration % 60}`;
}