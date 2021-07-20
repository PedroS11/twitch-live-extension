import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { setLoading } from './commonReducer';
import { revokeToken } from '../../infrastructure/twitch/twitchRepository';
import {
    FollowedLivestream,
    ValidateTokenResponse,
} from '../../domain/infrastructure/twitch/twitch';
import { getCurrentUser, getFollowedLivestreams } from '../../infrastructure/twitch/twitchService';
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
        saveLivestreams: (state: TwitchStore, { payload }: PayloadAction<FollowedLivestream[]>) => {
            state.livestreams = payload;
        },
        resetLivestreams: (state: TwitchStore) => {
            state.livestreams = [];
        },
    },
});

const { saveLivestreams, resetLivestreams } = twitchSlice.actions;

/**
 * Get the all the live streams from the favorites list
 */
export const getLiveStreams = (): AppThunk<void> => async (dispatch) => {
    dispatch(setLoading());
    try {
        const user: ValidateTokenResponse = await getCurrentUser();

        dispatch(resetLivestreams());

        const livestreams: FollowedLivestream[] = await getFollowedLivestreams(user.user_id);

        dispatch(saveLivestreams(livestreams));
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
