import Chart from 'chart.js/auto';

export function bundledStats(brawlerData, mapData) {
    console.log(brawlerData.data.wins / (brawlerData.data.wins + brawlerData.data.losses), mapData.data.wins / (brawlerData.data.wins + mapData.data.losses))
    return {
        brawlerTotalGames: brawlerData.data.wins + brawlerData.data.losses, 
        brawlerWL: brawlerData.data.wins / (brawlerData.data.wins + brawlerData.data.losses),
        brawlerWins: brawlerData.data.wins,
        brawlerLosses: brawlerData.data.losses,
        brawlerMVP: brawlerData.data.mvps,
        mapTotalGames: mapData.data.wins + mapData.data.losses,
        mapWins: mapData.data.wins,
        mapLosses: mapData.data.losses,
        mapWL: mapData.data.wins / (brawlerData.data.wins + mapData.data.losses),
        mapMVP: mapData.data.mvps
    }
}

