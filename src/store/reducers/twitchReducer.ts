import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import {setLoading} from './commonReducer'
import {getStreamInfo, TwitchLiveInfo} from "../../infrastructure/twitch/twitchApi";

interface Twitchtore {
    streamerNames: string[],
    liveStreams: TwitchLiveInfo[]
}

const initialState: Twitchtore = {
    streamerNames: ["garciap"],
    liveStreams: [
        JSON.parse("{\"_id\":179704738,\"game\":\"Just Chatting\",\"broadcast_platform\":\"live\",\"community_id\":\"\",\"community_ids\":[],\"viewers\":166,\"video_height\":1080,\"average_fps\":60,\"delay\":0,\"created_at\":\"2020-07-29T09:01:19Z\",\"is_playlist\":false,\"stream_type\":\"live\",\"preview\":{\"small\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-80x45.jpg\",\"medium\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-320x180.jpg\",\"large\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-640x360.jpg\",\"template\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-{width}x{height}.jpg\"},\"channel\":{\"mature\":true,\"status\":\"É MEIO DA SEMANA MANOS! !discord \",\"broadcaster_language\":\"pt\",\"broadcaster_software\":\"\",\"display_name\":\"GARCIAp\",\"game\":\"Just Chatting\",\"language\":\"pt\",\"_id\":162792265,\"name\":\"garciap\",\"created_at\":\"2017-07-04T19:31:28.339805Z\",\"updated_at\":\"2020-07-29T12:41:10.240478Z\",\"partner\":true,\"logo\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/e1417ae4-2196-40f6-88d0-db293a553a46-profile_image-300x300.png\",\"video_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/7279801a-b531-479a-86ad-1e6244d92f8d-channel_offline_image-1920x1080.png\",\"profile_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/a8d86cba-e26f-436e-a5f1-3b9c4cbbdcc9-profile_banner-480.png\",\"profile_banner_background_color\":\"\",\"url\":\"https://www.twitch.tv/garciap\",\"views\":131216,\"followers\":6688,\"broadcaster_type\":\"\",\"description\":\"\",\"private_video\":false,\"privacy_options_enabled\":false}}"),
        JSON.parse("{\"_id\":179704738,\"game\":\"Just Chatting\",\"broadcast_platform\":\"live\",\"community_id\":\"\",\"community_ids\":[],\"viewers\":166,\"video_height\":1080,\"average_fps\":60,\"delay\":0,\"created_at\":\"2020-07-29T09:01:19Z\",\"is_playlist\":false,\"stream_type\":\"live\",\"preview\":{\"small\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-80x45.jpg\",\"medium\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-320x180.jpg\",\"large\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-640x360.jpg\",\"template\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-{width}x{height}.jpg\"},\"channel\":{\"mature\":true,\"status\":\"É MEIO DA SEMANA MANOS! !discord \",\"broadcaster_language\":\"pt\",\"broadcaster_software\":\"\",\"display_name\":\"GARCIAp\",\"game\":\"Just Chatting\",\"language\":\"pt\",\"_id\":162792265,\"name\":\"garciap\",\"created_at\":\"2017-07-04T19:31:28.339805Z\",\"updated_at\":\"2020-07-29T12:41:10.240478Z\",\"partner\":true,\"logo\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/e1417ae4-2196-40f6-88d0-db293a553a46-profile_image-300x300.png\",\"video_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/7279801a-b531-479a-86ad-1e6244d92f8d-channel_offline_image-1920x1080.png\",\"profile_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/a8d86cba-e26f-436e-a5f1-3b9c4cbbdcc9-profile_banner-480.png\",\"profile_banner_background_color\":\"\",\"url\":\"https://www.twitch.tv/garciap\",\"views\":131216,\"followers\":6688,\"broadcaster_type\":\"\",\"description\":\"\",\"private_video\":false,\"privacy_options_enabled\":false}}"),
        JSON.parse("{\"_id\":179704738,\"game\":\"Just Chatting\",\"broadcast_platform\":\"live\",\"community_id\":\"\",\"community_ids\":[],\"viewers\":166,\"video_height\":1080,\"average_fps\":60,\"delay\":0,\"created_at\":\"2020-07-29T09:01:19Z\",\"is_playlist\":false,\"stream_type\":\"live\",\"preview\":{\"small\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-80x45.jpg\",\"medium\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-320x180.jpg\",\"large\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-640x360.jpg\",\"template\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-{width}x{height}.jpg\"},\"channel\":{\"mature\":true,\"status\":\"É MEIO DA SEMANA MANOS! !discord \",\"broadcaster_language\":\"pt\",\"broadcaster_software\":\"\",\"display_name\":\"GARCIAp\",\"game\":\"Just Chatting\",\"language\":\"pt\",\"_id\":162792265,\"name\":\"garciap\",\"created_at\":\"2017-07-04T19:31:28.339805Z\",\"updated_at\":\"2020-07-29T12:41:10.240478Z\",\"partner\":true,\"logo\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/e1417ae4-2196-40f6-88d0-db293a553a46-profile_image-300x300.png\",\"video_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/7279801a-b531-479a-86ad-1e6244d92f8d-channel_offline_image-1920x1080.png\",\"profile_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/a8d86cba-e26f-436e-a5f1-3b9c4cbbdcc9-profile_banner-480.png\",\"profile_banner_background_color\":\"\",\"url\":\"https://www.twitch.tv/garciap\",\"views\":131216,\"followers\":6688,\"broadcaster_type\":\"\",\"description\":\"\",\"private_video\":false,\"privacy_options_enabled\":false}}"),
        JSON.parse("{\"_id\":179704738,\"game\":\"Just Chatting\",\"broadcast_platform\":\"live\",\"community_id\":\"\",\"community_ids\":[],\"viewers\":166,\"video_height\":1080,\"average_fps\":60,\"delay\":0,\"created_at\":\"2020-07-29T09:01:19Z\",\"is_playlist\":false,\"stream_type\":\"live\",\"preview\":{\"small\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-80x45.jpg\",\"medium\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-320x180.jpg\",\"large\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-640x360.jpg\",\"template\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-{width}x{height}.jpg\"},\"channel\":{\"mature\":true,\"status\":\"É MEIO DA SEMANA MANOS! !discord \",\"broadcaster_language\":\"pt\",\"broadcaster_software\":\"\",\"display_name\":\"GARCIAp\",\"game\":\"Just Chatting\",\"language\":\"pt\",\"_id\":162792265,\"name\":\"garciap\",\"created_at\":\"2017-07-04T19:31:28.339805Z\",\"updated_at\":\"2020-07-29T12:41:10.240478Z\",\"partner\":true,\"logo\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/e1417ae4-2196-40f6-88d0-db293a553a46-profile_image-300x300.png\",\"video_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/7279801a-b531-479a-86ad-1e6244d92f8d-channel_offline_image-1920x1080.png\",\"profile_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/a8d86cba-e26f-436e-a5f1-3b9c4cbbdcc9-profile_banner-480.png\",\"profile_banner_background_color\":\"\",\"url\":\"https://www.twitch.tv/garciap\",\"views\":131216,\"followers\":6688,\"broadcaster_type\":\"\",\"description\":\"\",\"private_video\":false,\"privacy_options_enabled\":false}}"),
        JSON.parse("{\"_id\":179704738,\"game\":\"Just Chatting\",\"broadcast_platform\":\"live\",\"community_id\":\"\",\"community_ids\":[],\"viewers\":166,\"video_height\":1080,\"average_fps\":60,\"delay\":0,\"created_at\":\"2020-07-29T09:01:19Z\",\"is_playlist\":false,\"stream_type\":\"live\",\"preview\":{\"small\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-80x45.jpg\",\"medium\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-320x180.jpg\",\"large\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-640x360.jpg\",\"template\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-{width}x{height}.jpg\"},\"channel\":{\"mature\":true,\"status\":\"É MEIO DA SEMANA MANOS! !discord \",\"broadcaster_language\":\"pt\",\"broadcaster_software\":\"\",\"display_name\":\"GARCIAp\",\"game\":\"Just Chatting\",\"language\":\"pt\",\"_id\":162792265,\"name\":\"garciap\",\"created_at\":\"2017-07-04T19:31:28.339805Z\",\"updated_at\":\"2020-07-29T12:41:10.240478Z\",\"partner\":true,\"logo\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/e1417ae4-2196-40f6-88d0-db293a553a46-profile_image-300x300.png\",\"video_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/7279801a-b531-479a-86ad-1e6244d92f8d-channel_offline_image-1920x1080.png\",\"profile_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/a8d86cba-e26f-436e-a5f1-3b9c4cbbdcc9-profile_banner-480.png\",\"profile_banner_background_color\":\"\",\"url\":\"https://www.twitch.tv/garciap\",\"views\":131216,\"followers\":6688,\"broadcaster_type\":\"\",\"description\":\"\",\"private_video\":false,\"privacy_options_enabled\":false}}"),
        JSON.parse("{\"_id\":179704738,\"game\":\"Just Chatting\",\"broadcast_platform\":\"live\",\"community_id\":\"\",\"community_ids\":[],\"viewers\":166,\"video_height\":1080,\"average_fps\":60,\"delay\":0,\"created_at\":\"2020-07-29T09:01:19Z\",\"is_playlist\":false,\"stream_type\":\"live\",\"preview\":{\"small\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-80x45.jpg\",\"medium\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-320x180.jpg\",\"large\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-640x360.jpg\",\"template\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-{width}x{height}.jpg\"},\"channel\":{\"mature\":true,\"status\":\"É MEIO DA SEMANA MANOS! !discord \",\"broadcaster_language\":\"pt\",\"broadcaster_software\":\"\",\"display_name\":\"GARCIAp\",\"game\":\"Just Chatting\",\"language\":\"pt\",\"_id\":162792265,\"name\":\"garciap\",\"created_at\":\"2017-07-04T19:31:28.339805Z\",\"updated_at\":\"2020-07-29T12:41:10.240478Z\",\"partner\":true,\"logo\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/e1417ae4-2196-40f6-88d0-db293a553a46-profile_image-300x300.png\",\"video_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/7279801a-b531-479a-86ad-1e6244d92f8d-channel_offline_image-1920x1080.png\",\"profile_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/a8d86cba-e26f-436e-a5f1-3b9c4cbbdcc9-profile_banner-480.png\",\"profile_banner_background_color\":\"\",\"url\":\"https://www.twitch.tv/garciap\",\"views\":131216,\"followers\":6688,\"broadcaster_type\":\"\",\"description\":\"\",\"private_video\":false,\"privacy_options_enabled\":false}}"),
        JSON.parse("{\"_id\":179704738,\"game\":\"Just Chatting\",\"broadcast_platform\":\"live\",\"community_id\":\"\",\"community_ids\":[],\"viewers\":166,\"video_height\":1080,\"average_fps\":60,\"delay\":0,\"created_at\":\"2020-07-29T09:01:19Z\",\"is_playlist\":false,\"stream_type\":\"live\",\"preview\":{\"small\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-80x45.jpg\",\"medium\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-320x180.jpg\",\"large\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-640x360.jpg\",\"template\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-{width}x{height}.jpg\"},\"channel\":{\"mature\":true,\"status\":\"É MEIO DA SEMANA MANOS! !discord \",\"broadcaster_language\":\"pt\",\"broadcaster_software\":\"\",\"display_name\":\"GARCIAp\",\"game\":\"Just Chatting\",\"language\":\"pt\",\"_id\":162792265,\"name\":\"garciap\",\"created_at\":\"2017-07-04T19:31:28.339805Z\",\"updated_at\":\"2020-07-29T12:41:10.240478Z\",\"partner\":true,\"logo\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/e1417ae4-2196-40f6-88d0-db293a553a46-profile_image-300x300.png\",\"video_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/7279801a-b531-479a-86ad-1e6244d92f8d-channel_offline_image-1920x1080.png\",\"profile_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/a8d86cba-e26f-436e-a5f1-3b9c4cbbdcc9-profile_banner-480.png\",\"profile_banner_background_color\":\"\",\"url\":\"https://www.twitch.tv/garciap\",\"views\":131216,\"followers\":6688,\"broadcaster_type\":\"\",\"description\":\"\",\"private_video\":false,\"privacy_options_enabled\":false}}"),
        JSON.parse("{\"_id\":179704738,\"game\":\"Just Chatting\",\"broadcast_platform\":\"live\",\"community_id\":\"\",\"community_ids\":[],\"viewers\":166,\"video_height\":1080,\"average_fps\":60,\"delay\":0,\"created_at\":\"2020-07-29T09:01:19Z\",\"is_playlist\":false,\"stream_type\":\"live\",\"preview\":{\"small\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-80x45.jpg\",\"medium\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-320x180.jpg\",\"large\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-640x360.jpg\",\"template\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-{width}x{height}.jpg\"},\"channel\":{\"mature\":true,\"status\":\"É MEIO DA SEMANA MANOS! !discord \",\"broadcaster_language\":\"pt\",\"broadcaster_software\":\"\",\"display_name\":\"GARCIAp\",\"game\":\"Just Chatting\",\"language\":\"pt\",\"_id\":162792265,\"name\":\"garciap\",\"created_at\":\"2017-07-04T19:31:28.339805Z\",\"updated_at\":\"2020-07-29T12:41:10.240478Z\",\"partner\":true,\"logo\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/e1417ae4-2196-40f6-88d0-db293a553a46-profile_image-300x300.png\",\"video_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/7279801a-b531-479a-86ad-1e6244d92f8d-channel_offline_image-1920x1080.png\",\"profile_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/a8d86cba-e26f-436e-a5f1-3b9c4cbbdcc9-profile_banner-480.png\",\"profile_banner_background_color\":\"\",\"url\":\"https://www.twitch.tv/garciap\",\"views\":131216,\"followers\":6688,\"broadcaster_type\":\"\",\"description\":\"\",\"private_video\":false,\"privacy_options_enabled\":false}}"),
        JSON.parse("{\"_id\":179704738,\"game\":\"Just Chatting\",\"broadcast_platform\":\"live\",\"community_id\":\"\",\"community_ids\":[],\"viewers\":166,\"video_height\":1080,\"average_fps\":60,\"delay\":0,\"created_at\":\"2020-07-29T09:01:19Z\",\"is_playlist\":false,\"stream_type\":\"live\",\"preview\":{\"small\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-80x45.jpg\",\"medium\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-320x180.jpg\",\"large\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-640x360.jpg\",\"template\":\"https://static-cdn.jtvnw.net/previews-ttv/live_user_garciap-{width}x{height}.jpg\"},\"channel\":{\"mature\":true,\"status\":\"É MEIO DA SEMANA MANOS! !discord \",\"broadcaster_language\":\"pt\",\"broadcaster_software\":\"\",\"display_name\":\"GARCIAp\",\"game\":\"Just Chatting\",\"language\":\"pt\",\"_id\":162792265,\"name\":\"garciap\",\"created_at\":\"2017-07-04T19:31:28.339805Z\",\"updated_at\":\"2020-07-29T12:41:10.240478Z\",\"partner\":true,\"logo\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/e1417ae4-2196-40f6-88d0-db293a553a46-profile_image-300x300.png\",\"video_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/7279801a-b531-479a-86ad-1e6244d92f8d-channel_offline_image-1920x1080.png\",\"profile_banner\":\"https://static-cdn.jtvnw.net/jtv_user_pictures/a8d86cba-e26f-436e-a5f1-3b9c4cbbdcc9-profile_banner-480.png\",\"profile_banner_background_color\":\"\",\"url\":\"https://www.twitch.tv/garciap\",\"views\":131216,\"followers\":6688,\"broadcaster_type\":\"\",\"description\":\"\",\"private_video\":false,\"privacy_options_enabled\":false}}")
    ]
};

const twitchSlice = createSlice({
        name: 'twitch',
        initialState,
        reducers: {
            saveStreams: (state: Twitchtore, {payload}: PayloadAction<any[]>) => {
                state.liveStreams = payload;
            }
        }
    });

const {saveStreams} = twitchSlice.actions;

export const getLiveStreams = (): AppThunk => async dispatch => {
    dispatch(setLoading());

    // const response: TwitchLiveInfo | undefined = await getStreamInfo("garciap");
    // console.log(JSON.stringify(response))
    // if(response)
    //     dispatch(saveStreams([response]));



    dispatch(setLoading());
};

export const {reducer: twitchReducer} = twitchSlice;