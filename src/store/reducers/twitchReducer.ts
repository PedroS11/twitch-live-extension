import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import {setLoading} from './commonReducer'
import {getTwitchLiveInfo, getTwitchUserInfo} from "../../infrastructure/twitch/twitchApi";
import {FAVORITE_STREAMERS_STORAGE_KEY, TwitchStore} from "../../domain/store/twitchStore";
import {SaveFavoriteStreamResponse, TwitchLiveInfo, TwitchUserInfo} from "../../domain/infrastructure/twitch/twitchApi";
import {getStorageData, setStorageData} from "../../utils/localStorage";

const twitchSlice = createSlice({
    name: 'twitch',
    initialState: {
        liveStreams: [],
        favoriteStreamers: []
    } as TwitchStore,
    reducers: {
        addStream: (state: TwitchStore, {payload}: PayloadAction<TwitchLiveInfo>) => {
            state.liveStreams.push(payload);
        },
        resetLiveStreams: (state: TwitchStore) => {
            state.liveStreams = []
        },
        resetFavoriteStreamers: (state: TwitchStore) => {
            state.favoriteStreamers = []
        },
        saveFavoriteStreamers: (state: TwitchStore, {payload}: PayloadAction<TwitchUserInfo[]>) => {
            state.favoriteStreamers = payload
        },
        addFavoriteStream: (state: TwitchStore, {payload}: PayloadAction<TwitchUserInfo>) => {
            state.favoriteStreamers.push(payload)
        },
        sortByViewers: (state: TwitchStore) => {
            state.liveStreams.sort((a: TwitchLiveInfo, b: TwitchLiveInfo) => b.viewers - a.viewers);
        }
    }
});

const {addStream, resetLiveStreams, sortByViewers, resetFavoriteStreamers, saveFavoriteStreamers, addFavoriteStream} = twitchSlice.actions;

/**
 * Load the list of favorites streamers from local storage
 */
export const loadFavorites = (): AppThunk<void> => async dispatch => {
    dispatch(resetFavoriteStreamers());
    const data = getStorageData(FAVORITE_STREAMERS_STORAGE_KEY);
    const favorites: TwitchUserInfo[] = data ? JSON.parse(data) : [];
    dispatch(saveFavoriteStreamers(favorites));
};

/**
 * Add new favorite streamer to the list
 * @param {string} streamer - Streamer username to be added
 */
export const saveFavoriteStream = (streamer: string): AppThunk<Promise<SaveFavoriteStreamResponse>> => async (dispatch, getState) => {
    if (!getState().twitch.favoriteStreamers.some(e => e.name.toLowerCase() === streamer.toLowerCase())) {

        dispatch(setLoading());

        const user: TwitchUserInfo = await getTwitchUserInfo(streamer);
        if(!user) {
            dispatch(setLoading());

            return {
                success: false,
                message: `The user ${streamer} doesn't exist`
            };
        }

        dispatch(addFavoriteStream(user));
        setStorageData(FAVORITE_STREAMERS_STORAGE_KEY, JSON.stringify(getState().twitch.favoriteStreamers));
        dispatch(setLoading());

        return {
            success: true
        };
    }

    return {
        success: false,
        message: 'User already added to the list'
    }
};

/**
 * Get the all the live streams from the favorites list
 */
export const getLiveStreams = (): AppThunk<void> => async (dispatch, getState) => {
    dispatch(resetLiveStreams());
    dispatch(loadFavorites());

    let favorites: TwitchUserInfo[] = getState().twitch.favoriteStreamers;

    if (!favorites.length) return;

    dispatch(setLoading());

    const results = await Promise.allSettled(favorites.map((streamer: TwitchUserInfo) => getTwitchLiveInfo(streamer._id)));

    results.forEach((response) => {
        if (response.status === 'fulfilled') {
            response.value && dispatch(addStream(response.value));
        } else console.error(response.reason)
    });

    dispatch(sortByViewers());

    dispatch(setLoading());
};

/**
 * Removes a streamer from the favorites list
 * @param {string} streamer - Streamer username to be removed
 */
export const removeStream = (streamer: string): AppThunk<void> => async (dispatch, getState) => {
    const favorites: TwitchUserInfo[] = getState().twitch.favoriteStreamers;

    const newFavorites: TwitchUserInfo[] = favorites.filter((element: TwitchUserInfo) => element.name.toLowerCase() !== streamer.toLowerCase());

    dispatch(saveFavoriteStreamers(newFavorites));
    setStorageData(FAVORITE_STREAMERS_STORAGE_KEY, JSON.stringify(newFavorites))
};

export const {reducer: twitchReducer} = twitchSlice;