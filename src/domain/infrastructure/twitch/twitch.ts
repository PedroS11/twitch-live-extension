interface SearchResponse<T> {
    data: T[];
}

type SearchPaginationResponse<T> = SearchResponse<T> & {
    pagination?: {
        cursor: string;
    };
};

type SearchTotalPaginationResponse<T> = SearchPaginationResponse<T> & {
    total: number;
};

//-----------------------------------------------------------------------------
//--------------------------- Get Users Follows -----------------------------------
//-----------------------------------------------------------------------------

export interface GetUserFollow {
    from_id: string;
    from_name: string;
    to_id: string;
    to_name: string;
    followed_at: string;
}

export type GetUserFollowsResponse = SearchTotalPaginationResponse<GetUserFollow>;

//-----------------------------------------------------------------------------
//--------------------------- Validate Token -----------------------------------
//-----------------------------------------------------------------------------

export interface ValidateTokenResponse {
    client_id: string;
    login: string;
    scopes: string[];
    user_id: string;
    expires_in: number;
}

//-----------------------------------------------------------------------------
//--------------------------- Get Streams -----------------------------------
//-----------------------------------------------------------------------------

export interface GetStream {
    id: string;
    user_id: string;
    user_name: string;
    game_id: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
}

export type GetStreamsResponse = SearchPaginationResponse<GetStream>;

//-----------------------------------------------------------------------------
//--------------------------- Get Users -----------------------------------
//-----------------------------------------------------------------------------

export interface GetUser {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email: string;
}

export type GetUsersResponse = SearchResponse<GetUser>;

//-----------------------------------------------------------------------------
//--------------------------- FollowedLivestream -----------------------------------
//-----------------------------------------------------------------------------

export interface FollowedLivestream {
    user_id: string;
    url: string;
    display_name: string;
    profile_image_url: string;
    title: string;
    game: string;
    viewer_count: number;
    id: string;
    started_at: string;
}

//-----------------------------------------------------------------------------
//--------------------------- Get Games -----------------------------------
//-----------------------------------------------------------------------------

export interface GetGame {
    box_art_url: string;
    id: string;
    name: string;
}

export type GetGamesResponse = SearchPaginationResponse<GetGame>;
