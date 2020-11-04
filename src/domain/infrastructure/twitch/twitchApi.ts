export interface TwitchUserInfo {
    display_name: string;
    name: string;
    logo: string;
    _id: string;
    bio?: string;
    type: string;
    created_at: string;
    updated_at: string;
}

export interface TwitchGetUserInfo {
    _total: number;
    users: TwitchUserInfo[];
}

export interface TwitchLiveInfo {
    _id: number;
    game: string;
    viewers: number;
    channel: {
        display_name: string;
        logo: string;
        name: string;
        url: string;
    };
}

export interface TwitchGetLiveInfo {
    streams: TwitchLiveInfo[];
}

export interface SaveFavoriteStreamResponse {
    success: boolean;
    message?: string;
}
