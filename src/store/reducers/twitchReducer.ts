import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import {setLoading} from './commonReducer'
import {getStreamInfo} from "../../infrastructure/twitch/twitchApi";
import {FAVORITE_STREAMERS_STORAGE_KEY, TwitchStore} from "../../domain/store/twitchStore";
import {TwitchLiveInfo} from "../../domain/infrastructure/twitch/twitchApi";
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
        saveFavoriteStreamers: (state: TwitchStore, {payload}: PayloadAction<string[]>) => {
            state.favoriteStreamers = payload
        },
        addFavoriteStream: (state: TwitchStore, {payload}: PayloadAction<string>) => {
            state.favoriteStreamers.push(payload)
        },
        sortByViewers: (state: TwitchStore) => {
            state.liveStreams.sort((a: TwitchLiveInfo, b: TwitchLiveInfo) => b.viewers - a.viewers);
        }
    }
});

const {addStream, resetLiveStreams, sortByViewers, resetFavoriteStreamers, saveFavoriteStreamers, addFavoriteStream} = twitchSlice.actions;

export const loadFavorites = (): AppThunk<void> => async dispatch => {
    dispatch(resetFavoriteStreamers());
    const data = getStorageData(FAVORITE_STREAMERS_STORAGE_KEY);
    const favorites: string[] = data ? JSON.parse(data) : [];
    dispatch(saveFavoriteStreamers(favorites))
};

export const saveFavoriteStream = (stream: string): AppThunk<any> => (dispatch, getState) => {
    if (!getState().twitch.favoriteStreamers.some(e => e.toLowerCase() === stream.toLowerCase())) {
        dispatch(addFavoriteStream(stream));
        setStorageData(FAVORITE_STREAMERS_STORAGE_KEY, JSON.stringify(getState().twitch.favoriteStreamers))

        // TODO: Check if username is valid
        return {
            success: true,
            message: ''
        };
    }

    return {
        success: false,
        message: 'User already added to the list'
    }
};

export const getLiveStreams = (): AppThunk<void> => async (dispatch, getState) => {
    dispatch(resetLiveStreams());

    if (!getState().twitch.favoriteStreamers.length) {
        dispatch(loadFavorites());
    }

    let favorites: string[] = getState().twitch.favoriteStreamers;

    if (!favorites.length) return;

    dispatch(setLoading());

    const results = await Promise.allSettled(favorites.map((streamer: string) => getStreamInfo(streamer)));

    results.forEach((response) => {
        if (response.status === 'fulfilled') {
            response.value && dispatch(addStream(response.value));
        } else console.error(response.reason)
    });

    dispatch(sortByViewers());

    dispatch(setLoading());
};

export const {reducer: twitchReducer} = twitchSlice;