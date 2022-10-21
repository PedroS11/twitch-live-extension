import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { setLoadFinished, setLoading, setLoadingMore } from './commonReducer';
import { revokeToken } from '../../infrastructure/twitch/twitchRepository';
import {
    FollowedLivestream,
    TopLivestreamResponse,
    ValidateTokenResponse,
} from '../../domain/infrastructure/twitch/twitch';
import {
    getAllFollowedStreams,
    getCurrentUser,
    getTopTwitchLiveStreams,
} from '../../infrastructure/twitch/twitchService';
import {
    sendDisableNotifMessage,
    sendEnableNotifMessage,
    sendGetTokenMessage,
    updateBadgeIcon,
} from '../../infrastructure/background/messageWrapper';
import { TwitchStore } from '../../domain/store/twitchStore';
import * as localStorageService from '../../infrastructure/localStorage/localStorageService';

const twitchSlice = createSlice({
    name: 'twitch',
    initialState: {
        livestreams: [],
        topLivestreams: [],
        cursor: '',
    } as TwitchStore,
    reducers: {
        saveLivestreams: (state: TwitchStore, { payload }: PayloadAction<FollowedLivestream[]>) => {
            state.livestreams = payload;
        },
        saveTopLivestreams: (
            state: TwitchStore,
            { payload }: PayloadAction<TopLivestreamResponse>,
        ) => {
            state.topLivestreams = payload.data;
            state.cursor = payload.cursor;
        },
        appendTopLivestreams: (
            state: TwitchStore,
            { payload }: PayloadAction<TopLivestreamResponse>,
        ) => {
            state.topLivestreams = [...state.topLivestreams, ...payload.data];
            state.cursor = payload.cursor;
        },
        resetLivestreams: (state: TwitchStore) => {
            state.livestreams = [];
        },
        resetTopLivestreams: (state: TwitchStore) => {
            state.topLivestreams = [];
            state.cursor = undefined;
        },
    },
});

export const {
    saveLivestreams,
    resetLivestreams,
    saveTopLivestreams,
    resetTopLivestreams,
    appendTopLivestreams,
} = twitchSlice.actions;

/**
 * Get the all the live streams from the favorites list
 */
export const getLiveStreams = (): AppThunk<void> => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const user: ValidateTokenResponse = await getCurrentUser();

        const data: FollowedLivestream[] = await getAllFollowedStreams(user.user_id);
        dispatch(saveLivestreams(data));

        await updateBadgeIcon(data.length);
    } catch (e) {
        console.log('An unexpected error was thrown', e);
    } finally {
        dispatch(setLoading());
    }
};

/**
 * Get top live streams
 */
export const getTopLiveStreams = (): AppThunk<void> => async (dispatch) => {
    dispatch(setLoading());
    try {
        dispatch(setLoadFinished(false));
        const livestreams: TopLivestreamResponse = await getTopTwitchLiveStreams();
        dispatch(saveTopLivestreams(livestreams));

        if (!livestreams.cursor) {
            dispatch(setLoadFinished(true));
        }
    } catch (e) {
        console.log('An unexpected error was thrown', e);
    } finally {
        dispatch(setLoading());
    }
};

export const getMoreTopLiveStreams = (): AppThunk<void> => async (dispatch, getState) => {
    if (getState().common.loadingMoreFinished) return;

    dispatch(setLoadingMore());
    try {
        const livestreams: TopLivestreamResponse = await getTopTwitchLiveStreams(
            getState().twitch.cursor,
        );

        dispatch(appendTopLivestreams(livestreams));

        if (!livestreams.cursor) {
            dispatch(setLoadFinished(true));
        }
    } catch (e) {
        console.log('An unexpected error was thrown', e);
    } finally {
        dispatch(setLoadingMore());
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
        await sendGetTokenMessage(true);
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
