import create from "zustand";
import {
	FollowedStream,
	TopStream,
	TopStreamResponse,
} from "../domain/twitch/service";
import {
	getAllFollowedStreams,
	getCurrentUser,
	getTopStreams,
} from "../infrastructure/twitch/twitchService";
import { ValidateTokenResponse } from "../domain/twitch/api";
import { updateBadgeIcon } from "../infrastructure/background/messageWrapper";
import { clearDuplicatedStreams } from "../infrastructure/utils/clearDuplicatedStreams";

export interface TwitchState {
	loading: boolean;
	loadingMore: boolean;
	loadingMoreFinished: boolean;
	livestreams: FollowedStream[];
	topLivestreams: TopStream[];
	cursor?: string;

	setLoading: () => void;
	setLoadingMore: () => void;
	setLoadingMoreFinished: (value: boolean) => void;
	saveLivestreams: (streams: FollowedStream[]) => void;
	resetLivestreams: () => void;
	resetTopLivestreams: () => void;
	getLivestreams: () => void;
	getUser: () => Promise<ValidateTokenResponse>;
	fetchMoreTopLivestreams: () => void;
	getTopLivestreams: () => void;
}

export const useTwitchStore = create<TwitchState>()((set, get) => ({
	loading: false,
	loadingMore: false,
	loadingMoreFinished: false,
	livestreams: [],
	topLivestreams: [],

	setLoading: () => {
		set((state) => ({
			...state,
			loading: !state.loading,
		}));
	},
	setLoadingMore: () => {
		set((state) => ({
			...state,
			loadingMore: !state.loadingMore,
		}));
	},
	setLoadingMoreFinished: (value: boolean) =>
		set({ loadingMoreFinished: value }),

	saveLivestreams: (streams: FollowedStream[]) => set({ livestreams: streams }),
	resetLivestreams: () => set({ livestreams: [] }),
	resetTopLivestreams: () => set({ topLivestreams: [], cursor: undefined }),

	getLivestreams: async () => {
		get().setLoading();
		try {
			const user: ValidateTokenResponse = await getCurrentUser();
			const data: FollowedStream[] = await getAllFollowedStreams(user.user_id);
			set({
				livestreams: data,
			});
			await updateBadgeIcon(data.length);
		} catch (e) {
			console.log("An unexpected error was thrown", e);
		} finally {
			get().setLoading();
		}
	},

	getUser: async (): Promise<ValidateTokenResponse> => {
		get().setLoading();
		let user: ValidateTokenResponse;
		try {
			user = await getCurrentUser();
		} catch (e) {
			console.log("An unexpected error was thrown", e);
		} finally {
			get().setLoading();
		}
		return user;
	},

	fetchMoreTopLivestreams: async () => {
		if (get().loadingMoreFinished) {
			return;
		}

		get().setLoadingMore();

		try {
			const moreTopStreams: TopStreamResponse = await getTopStreams(
				get().cursor,
			);

			console.log(
				"TOP",
				get().topLivestreams.map((e) => e.user_id),
			);
			console.log(
				"MORE",
				moreTopStreams.data.map((e) => e.user_id),
			);

			const mergedList = [...get().topLivestreams, ...moreTopStreams.data];

			set({
				topLivestreams: clearDuplicatedStreams(mergedList),
				cursor: moreTopStreams.cursor,
			});

			if (!moreTopStreams.cursor) {
				set({
					loadingMoreFinished: true,
				});
			}
		} catch (e) {
			console.log("An unexpected error was thrown", e);
		} finally {
			get().setLoadingMore();
		}
	},

	getTopLivestreams: async () => {
		get().setLoading();
		try {
			get().setLoadingMoreFinished(false);
			const streams: TopStreamResponse = await getTopStreams();
			set({
				topLivestreams: streams.data,
				cursor: streams.cursor,
			});
			if (!streams.cursor) {
				set({
					loadingMoreFinished: true,
				});
			}
		} catch (e) {
			console.log("An unexpected error was thrown", e);
		} finally {
			get().setLoading();
		}
	},
}));
