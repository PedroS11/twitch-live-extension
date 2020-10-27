import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import {setLoading} from './commonReducer'
import {getStreamInfo} from "../../infrastructure/twitch/twitchApi";
import {getStorageData} from "../../infrastructure/chromeStorage/chromeStorage";
import {FAVORITE_STREAMERS_STORAGE_KEY, TwitchStore} from "../../domain/store/twitchStore";
import {TwitchLiveInfo} from "../../domain/infrastructure/twitch/twitchApi";

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
        sortByViewers: (state: TwitchStore) => {
            state.liveStreams.sort((a: TwitchLiveInfo, b: TwitchLiveInfo) => b.viewers - a.viewers);
        }
    }
});

const {addStream, resetLiveStreams, sortByViewers, resetFavoriteStreamers, saveFavoriteStreamers} = twitchSlice.actions;

export const loadFavorites = (): AppThunk => async dispatch => {
    dispatch(resetFavoriteStreamers());
    console.log('oi')
    const favorites: string[] = ['itsbinkybee']; //await getStorageData(FAVORITE_STREAMERS_STORAGE_KEY) || [];
    dispatch(saveFavoriteStreamers(favorites))
};

export const getLiveStreams = (): AppThunk => async (dispatch, getState) => {
    console.log(getState())
    console.log('oi2')

    // dispatch(resetLiveStreams());
    //
    // const streamNamesList: string[] = await getStorageData("streamNamesList") || [];
    // if(!streamNamesList.length) return;
    //
    // dispatch(setLoading());
    //
    // const results = await Promise.allSettled(streamNamesList.map((streamer: string) => getStreamInfo(streamer)));
    //
    // results.forEach((response) => {
    //     if (response.status === 'fulfilled') {
    //         response.value && dispatch(addStream(response.value));
    //     }
    //     else console.error(response.reason)
    // });
    //
    // dispatch(sortByViewers());
    //
    // dispatch(setLoading());
};

export const {reducer: twitchReducer} = twitchSlice;