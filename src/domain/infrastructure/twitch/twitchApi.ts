export interface TwitchUserInfo {
    display_name: string,
    name: string,
    logo: string,
    _id: string,
    bio: string,
    type: string,
    created_at: string,
    updated_at: string
}

export interface TwitchGetUserInfo {
    _total: number,
    users: TwitchUserInfo[]
}

export interface TwitchLiveInfo {
    _id: number,
    game: string,
    viewers: number,
    channel: {
        name: string,
        display_name: string,
        logo: string,
        url: string
    }
}

export interface TwitchGetLiveInfo {
    streams: TwitchLiveInfo[]
}