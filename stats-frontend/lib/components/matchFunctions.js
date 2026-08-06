import Chart from 'chart.js/auto';

export function bundledStats(brawlerData, mapData, modeData) {
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
        mapMVP: mapData.data.mvps,
        modeTotalGames: modeData.data.wins + modeData.data.losses,
        modeWins: modeData.data.wins,
        modeLosses: modeData.data.losses,
        modeWL: modeData.data.wins / (modeData.data.wins + modeData.data.losses),
        modeMVP: modeData.data.mvps,
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

export const calc_display_stats = (focusedStats) => {
    const mapTotalGames = focusedStats?.maps.wins + focusedStats?.maps.losses;
    const brawlerMapGames = focusedStats?.brawlers_map.wins + focusedStats?.brawlers_map.losses;
    const modeTotalGames = focusedStats?.modes.wins + focusedStats?.modes.losses;
    const brawlerModeGames = focusedStats?.brawlers_mode.wins + focusedStats?.brawlers_mode.losses;

    const selectedMapWL = focusedStats?.brawlers_map.wins / brawlerMapGames;
    const selectedModeWL = focusedStats?.brawlers_mode.wins / brawlerModeGames;
    const selectedMapPick = brawlerMapGames / mapTotalGames;
    const selectedModePick =  brawlerModeGames / modeTotalGames;

    const delta = ((selectedMapWL - focusedStats?.top_map_winrate) + 
                  (selectedModeWL - focusedStats?.top_mode_winrate) + 
                  (selectedMapPick - focusedStats?.top_map_pickrate) + 
                  (selectedModePick - focusedStats?.top_mode_pickrate))/4;
    const statColor = {
        mapWLGreen: (selectedMapWL >= focusedStats?.top_map_winrate),
        modeWLGreen: (selectedModeWL >= focusedStats?.top_mode_winrate),
        mapPickGreen: (selectedMapPick >= focusedStats?.top_map_pickrate),
        modePickGreen: (selectedModePick >= focusedStats?.top_mode_pickrate),
        deltaGreen: (delta >= 0),
    };

    const letters = ['F','D','C','B','A'];
    const grade = letters[Math.floor(5*((delta/2) + .5))]; //grade algorithm

    
    return {
        selectedMapWL,
        selectedModeWL,
        selectedMapPick,
        selectedModePick,
        statColor,
        delta,
        grade,
    }
}