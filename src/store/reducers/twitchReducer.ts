import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import {setLoading} from './commonReducer'
import {getStreamInfo, TwitchLiveInfo} from "../../infrastructure/twitch/twitchApi";
import {getStorageData} from "../../infrastructure/chromeStorage/chromeStorage";

interface Twitchtore {
    liveStreams: TwitchLiveInfo[]
}

const twitchSlice = createSlice({
    name: 'twitch',
    initialState: {
        liveStreams: []
    } as Twitchtore,
    reducers: {
        addStream: (state: Twitchtore, {payload}: PayloadAction<TwitchLiveInfo>) => {
            state.liveStreams.push(payload);
        },
        resetLiveStreams: (state: Twitchtore) => {
            state.liveStreams = []
        }
    }
});

const {addStream, resetLiveStreams} = twitchSlice.actions;

export const getLiveStreams = (): AppThunk => async dispatch => {
    dispatch(resetLiveStreams());

    const streamNamesList: string[] = await getStorageData("streamNamesList") || [];
    if(!streamNamesList.length) return;

    dispatch(setLoading());

    const results = await Promise.allSettled(streamNamesList.map((streamer: string) => getStreamInfo(streamer)));

    results.forEach((response) => {
        if (response.status === 'fulfilled') {
            response.value && dispatch(addStream(response.value));
        }
        else console.error(response)
    });

    dispatch(setLoading());
};

export const {reducer: twitchReducer} = twitchSlice;