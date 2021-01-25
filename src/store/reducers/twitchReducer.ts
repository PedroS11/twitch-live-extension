import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { setLoading } from './commonReducer';
import { revokeToken } from '../../infrastructure/twitch/twitchRepository';
import { FollowedLivestream, GetUserFollow, ValidateTokenResponse } from '../../domain/infrastructure/twitch/twitch';
import { getCurrentUser, getFollowedLivestreams, getUserFollowers } from '../../infrastructure/twitch/twitchService';
import {
    sendDisableNotifMessage,
    sendEnableNotifMessage,
    sendGetTokenMessage,
} from '../../infrastructure/background/messageWrapper';
import { TwitchStore } from '../../domain/store/twitchStore';
import * as localStorageService from '../../infrastructure/localStorage/localStorageService';

export const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;

const twitchSlice = createSlice({
    name: 'twitch',
    initialState: {
        livestreams: [],
    } as TwitchStore,
    reducers: {
        sortByViewers: (state: TwitchStore) => {
            state.livestreams.sort((a: FollowedLivestream, b: FollowedLivestream) => b.viewer_count - a.viewer_count);
        },
        saveLivestreams: (state: TwitchStore, { payload }: PayloadAction<FollowedLivestream[]>) => {
            state.livestreams = payload;
        },
        resetLivestreams: (state: TwitchStore) => {
            state.livestreams = [];
        },
    },
});

const { sortByViewers, saveLivestreams, resetLivestreams } = twitchSlice.actions;

export const syncFollows = (): AppThunk<void> => async (dispatch) => {
    dispatch(setLoading());

    try {
        const user: ValidateTokenResponse = await getCurrentUser();
        const follows: GetUserFollow[] = await getUserFollowers(user.user_id);
        localStorageService.storeFollows(follows);
        localStorageService.storeLastFollowsUpdateTimestamp(Date.now());
    } catch (e) {
        console.log('An unexpected error was thrown', e);
    } finally {
        dispatch(setLoading());
    }
};

/**
 * Get the all the live streams from the favorites list
 */
export const getLiveStreams = (): AppThunk<void> => async (dispatch) => {
    dispatch(setLoading());
    try {
        let follows: GetUserFollow[];
        // @ts-ignore
        const lastUpdate: number = localStorageService.getLastFollowUpdateTimestamp();

        // First execution or the follows are outdated
        if (!lastUpdate || Date.now() > lastUpdate + ONE_DAY_IN_MILISECONDS) {
            const user: ValidateTokenResponse = await getCurrentUser();
            follows = await getUserFollowers(user.user_id);
            localStorageService.storeFollows(follows);
            localStorageService.storeLastFollowsUpdateTimestamp(Date.now());
        } else {
            follows = localStorageService.getFollows();
        }

        // User doesn't follow anyone
        if (!follows.length) {
            dispatch(setLoading());
            return;
        }

        dispatch(resetLivestreams());

        const livestreams: FollowedLivestream[] = await getFollowedLivestreams(follows.map((follow) => follow.to_id));
        console.log(livestreams);
        dispatch(saveLivestreams(livestreams));
        dispatch(sortByViewers());
    } catch (e) {
        console.log('An unexpected error was thrown', e);
    } finally {
        dispatch(setLoading());
    }
};

export const getUser = (): AppThunk<Promise<ValidateTokenResponse>> => async (dispatch) => {
    dispatch(setLoading());
    let user: ValidateTokenResponse;
    try {
        user = await getCurrentUser();
    } catch (e) {
        console.log('An unexpected error was thrown', e);
    } finally {
        dispatch(setLoading());
    }

    // @ts-ignore
    return user;
};

export const switchAccount = (): AppThunk<void> => async (dispatch) => {
    dispatch(setLoading());
    try {
        await revokeToken();
        localStorageService.clearToken();
        const token = await sendGetTokenMessage(true);
        localStorageService.storeToken(token);
    } catch (e) {
        console.log('An unexpected error was thrown', e);
    } finally {
        dispatch(setLoading());
    }
};

export const updateNotificationsState = (state: boolean): AppThunk<void> => async (dispatch) => {
    dispatch(setLoading());
    localStorageService.storeNotificationsFlag(state);

    if (state) {
        await sendEnableNotifMessage();
    } else {
        await sendDisableNotifMessage();
    }
    dispatch(setLoading());
};

export const { reducer: twitchReducer } = twitchSlice;
