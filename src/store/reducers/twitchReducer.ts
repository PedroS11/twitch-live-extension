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
        liveStreams: [
            {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            // {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            // {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            // {"_id":297664674,"game":"Fall Guys","viewers":11,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}},
            // {"_id":297664674,"game":"Fall Guys","viewers":1000,"channel":{"display_name":"TheNumber13_","name":"thenumber13_","logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/8e08f423-da21-42a6-a478-ae48e915d4a7-profile_image-300x300.png","url":"https://www.twitch.tv/thenumber13_"}}
            ]
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
    // const streamNamesList: string[] = ["Thenumber13_", "rskeleton", "moraishd"];//await getStorageData("streamNamesList");
    // if(!streamNamesList.length) return;
    //
    // dispatch(setLoading());
    // dispatch(resetLiveStreams());
    //
    // const results = await Promise.allSettled(streamNamesList.map((streamer: string) => getStreamInfo(streamer)));
    //
    // results.forEach((response) => {
    //     if (response.status === 'fulfilled') {
    //         response.value && dispatch(addStream(response.value));
    //     }
    //     else console.error(response)
    // });
    //
    // dispatch(setLoading());
};

export const {reducer: twitchReducer} = twitchSlice;