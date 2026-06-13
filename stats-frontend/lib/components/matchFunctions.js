export function bundledStats(brawlerData, mapData) {
    return {
        brawlerTotalGames: brawlerData.data.wins + brawlerData.data.losses, 
        brawlerWL: brawlerData.data.wins / (brawlerData.data.wins + brawlerData.data.losses),
        brawlerMVP: brawlerData.data.mvps,
        mapTotalGames: mapData.data.wins + mapData.data.losses,
        mapWL: mapData.data.wins / (brawlerData.data.wins + mapData.data.losses),
        mapMVP: mapData.data.mvps
    }
}