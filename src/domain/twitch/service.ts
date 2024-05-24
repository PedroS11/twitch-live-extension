//-----------------------------------------------------------------------------
//----------------------------- FollowedStream --------------------------------
//-----------------------------------------------------------------------------

import { TwitchTopGame } from "./api";

export interface FollowedStream {
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

export interface FollowedStreamResponse {
	cursor?: string;
	data: FollowedStream[];
}

//-----------------------------------------------------------------------------
//--------------------------- TopStream -----------------------------------
//-----------------------------------------------------------------------------

export type TopStream = FollowedStream;

export interface TopStreamResponse {
	cursor?: string;
	data: TopStream[];
}

//-----------------------------------------------------------------------------
//--------------------------- TopStream -----------------------------------
//-----------------------------------------------------------------------------

export type TopGame = TwitchTopGame & {
	viewer_count: number;
};

export interface TopGamesResponse {
	cursor?: string;
	data: TopGame[];
}
