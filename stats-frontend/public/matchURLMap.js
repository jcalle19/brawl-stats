export const matchURLs = {
    'brawlBall': '/mode_images/brawl_ball_icon.png',
    'gemGrab': '/mode_images/gem_grab_icon.png',
    'hotZone': '/mode_images/hot_zone_icon.png',
    'bounty': '/mode_images/bounty_icon.png',
    'heist': '/mode_images/heist_icon.png',
    'knockOut': '/mode_images/knock_out_icon.png',
    
}

export const maps = {
    'Belle\'s rock' : '/maps/belles_rock.png',
    'Bridge Too Far' : '/maps/bridge_too_far.png',
    'Center Stage' : '/maps/center_stage.png',
    'Double Swoosh' : '/maps/double_swoosh.png',
    'Dueling Beetles': '/maps/dueling_beetles.png',
    'Flaring Phoenix': '/maps/flaring_phoenix.png',
    'Gem Fort': '/maps/gem_fort.png',
    'Hard Rock Mine': '/maps/hard_rock_mine.png',
    'Hideout': '/maps/hideout.png',
    'Hot Potato': '/maps/hot_potato.png',
    'Kaboom Canyon': '/maps/kaboom_canyon.png',
    'Layer Cake': '/maps/layer_cake.png',
    'New Horizons': '/maps/new_horizons.png',
    'Open Business': '/maps/open_business.png',
    'Parallel Plays': '/maps/parallel_plays.png',
    'Pinball Dreams': '/maps/pinball_dreams.png',
    'Pit Stop': '/maps/pit_stop.png',
    'Ring of Fire': '/maps/ring_of_fire.png',
    'Safe Zone': '/maps/safe_zone.png',
    'Shooting Star': '/maps/shooting_star.png',
    'Sneaky Fields': '/maps/sneaky_fields.png',
    'Triple Dribble': '/maps/triple_dribble.png',
}

export const ranked_icons = [
    '/ranked_icons/bronze_icon.png',
    '/ranked_icons/silver_icon.png',
    '/ranked_icons/gold_icon.png',
    '/ranked_icons/diamond_icon.png',
    '/ranked_icons/mythic_icon.png',
    '/ranked_icons/legendary_icon.png',
    '/ranked_icons/masters_icon.png',
    '/ranked_icons/pro_icon.png',
]

export const rankedValueToIcon = (val) => {
    return ranked_icons[Math.floor(val / 3)];
}