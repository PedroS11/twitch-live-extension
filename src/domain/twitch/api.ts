interface SearchResponse<T> {
	data: T[];
}

type SearchPaginationResponse<T> = SearchResponse<T> & {
	pagination?: {
		cursor: string;
	};
};

//-----------------------------------------------------------------------------
//--------------------------- Validate Token ----------------------------------
//-----------------------------------------------------------------------------

export interface ValidateTokenResponse {
	client_id: string;
	login: string;
	scopes: string[];
	user_id: string;
	expires_in: number;
}

//-----------------------------------------------------------------------------
//--------------------------- Get Streams -------------------------------------
//-----------------------------------------------------------------------------

export interface TwitchStream {
	id: string;
	user_id: string;
	user_name: string;
	game_id: string;
	game_name: string;
	type: string;
	title: string;
	viewer_count: number;
	started_at: string;
	language: string;
	thumbnail_url: string;
}

export type GetStreamsResponse = SearchPaginationResponse<TwitchStream>;

//-----------------------------------------------------------------------------
//------------------------------ Get Users ------------------------------------
//-----------------------------------------------------------------------------

export interface TwitchUser {
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

export type GetUsersResponse = SearchResponse<TwitchUser>;

//-----------------------------------------------------------------------------
//--------------------------- GetFollowedStreams ------------------------------
//-----------------------------------------------------------------------------

export interface TwitchFollowedStream {
	id: string;
	user_id: string;
	user_login: string;
	user_name: string;
	game_id: string;
	game_name: string;
	type: string;
	title: string;
	viewer_count: number;
	started_at: string;
	language: string;
	thumbnail_url: string;
	tag_ids: string[];
}

export type GetFollowedStreamsResponse =
	SearchPaginationResponse<TwitchFollowedStream>;
