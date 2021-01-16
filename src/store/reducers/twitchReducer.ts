import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { setLoading } from './commonReducer';
import { revokeToken } from '../../infrastructure/twitch/twitchRepository';
import { FOLLOWS_KEY, LAST_FOLLOWS_UPDATE_KEY, TOKEN_KEY, TwitchStore } from '../../domain/store/twitchStore';
import { FollowedLivestream, GetUserFollow, ValidateTokenResponse } from '../../domain/infrastructure/twitch/twitch';
import { getStorageData, removeStorageData, setStorageData } from '../../utils/localStorage';
import { fetchToken } from '../../infrastructure/identityFlowAuth/indetityFlowAuth';
import { getCurrentUser, getFollowedLivestreams, getUserFollowers } from '../../infrastructure/twitch/twitchService';

const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;

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
        setStorageData(FOLLOWS_KEY, JSON.stringify(follows));
        setStorageData(LAST_FOLLOWS_UPDATE_KEY, Date.now() + '');
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
    // dispatch(setLoading());
    // try {
    //     let follows: GetUserFollow[];
    //     // @ts-ignore
    //     const lastUpdate: number = +getStorageData(LAST_FOLLOWS_UPDATE_KEY);
    //
    //     // First execution or the follows are outdated
    //     if (!lastUpdate || Date.now() > lastUpdate + ONE_DAY_IN_MILISECONDS) {
    //         const user: ValidateTokenResponse = await getCurrentUser();
    //         follows = await getUserFollowers(user.user_id);
    //         setStorageData(FOLLOWS_KEY, JSON.stringify(follows));
    //         setStorageData(LAST_FOLLOWS_UPDATE_KEY, Date.now() + '');
    //     } else {
    //         const data = getStorageData(FOLLOWS_KEY);
    //         follows = data ? JSON.parse(data) : [];
    //     }
    //
    //     // User doesn't follow anyone
    //     if (!follows.length) {
    //         dispatch(setLoading());
    //         return;
    //     }
    //
    //     dispatch(resetLivestreams());
    //
    //     const livestreams: FollowedLivestream[] = await getFollowedLivestreams(follows.map((follow) => follow.to_id));
    //
    //     dispatch(saveLivestreams(livestreams));
    //     dispatch(sortByViewers());
    // } catch (e) {
    //     console.log('An unexpected error was thrown', e);
    // } finally {
    //     dispatch(setLoading());
    // }
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
        removeStorageData(TOKEN_KEY);
        const token = await fetchToken(true);
        setStorageData(TOKEN_KEY, token);
    } catch (e) {
        console.log('An unexpected error was thrown', e);
    } finally {
        dispatch(setLoading());
    }
};

export const { reducer: twitchReducer } = twitchSlice;
