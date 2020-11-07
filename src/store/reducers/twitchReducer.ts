import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { setLoading } from './commonReducer';
import {
    getTwitchLiveInfo,
    getTwitchUserInfo,
} from '../../infrastructure/twitch/twitchRepository';
import { FAVORITE_STREAMERS_STORAGE_KEY, TwitchStore } from '../../domain/store/twitchStore';
import {
    FollowedLivestream,
    GetStream,
    GetUser, GetUserFollow,
    SaveFavoriteStreamResponse,
    TwitchLiveInfo,
    TwitchUserInfo,
} from '../../domain/infrastructure/twitch/twitchApi';
import { getStorageData, setStorageData } from '../../utils/localStorage';
import {fetchToken} from "../../infrastructure/identityFlowAuth/indetityFlowAuth";
import {getFollowedLivestreams, getUserFollowers} from "../../infrastructure/twitch/twitchService";

const twitchSlice = createSlice({
    name: 'twitch',
    initialState: {
        liveStreams: [],
        favoriteStreamers: [],
    } as TwitchStore,
    reducers: {
        addStream: (state: TwitchStore, { payload }: PayloadAction<TwitchLiveInfo>) => {
            state.liveStreams.push(payload);
        },
        resetLiveStreams: (state: TwitchStore) => {
            state.liveStreams = [];
        },
        resetFavoriteStreamers: (state: TwitchStore) => {
            state.favoriteStreamers = [];
        },
        saveFavoriteStreamers: (state: TwitchStore, { payload }: PayloadAction<TwitchUserInfo[]>) => {
            state.favoriteStreamers = payload;
        },
        addFavoriteStream: (state: TwitchStore, { payload }: PayloadAction<TwitchUserInfo>) => {
            state.favoriteStreamers.push(payload);
        },
        sortByViewers: (state: TwitchStore) => {
            state.liveStreams.sort((a: TwitchLiveInfo, b: TwitchLiveInfo) => b.viewers - a.viewers);
        },
    },
});

const {
    addStream,
    resetLiveStreams,
    sortByViewers,
    resetFavoriteStreamers,
    saveFavoriteStreamers,
    addFavoriteStream,
} = twitchSlice.actions;

/**
 * Load the list of favorites streamers from local storage
 */
export const loadFavorites = (): AppThunk<void> => async (dispatch) => {
    dispatch(resetFavoriteStreamers());
    const data = getStorageData(FAVORITE_STREAMERS_STORAGE_KEY);
    const favorites: TwitchUserInfo[] = data ? JSON.parse(data) : [];
    dispatch(saveFavoriteStreamers(favorites));
};

/**
 * Add new favorite streamer to the list
 * @param {string} streamer - Streamer username to be added
 */
export const saveFavoriteStream = (streamer: string): AppThunk<Promise<SaveFavoriteStreamResponse>> => async (
    dispatch,
    getState,
) => {
    if (!getState().twitch.favoriteStreamers.some((e) => e.name.toLowerCase() === streamer.toLowerCase())) {
        dispatch(setLoading());

        const user: TwitchUserInfo = await getTwitchUserInfo(streamer);
        if (!user) {
            dispatch(setLoading());

            return {
                success: false,
                message: `The user ${streamer} doesn't exist`,
            };
        }

        dispatch(addFavoriteStream(user));
        setStorageData(FAVORITE_STREAMERS_STORAGE_KEY, JSON.stringify(getState().twitch.favoriteStreamers));
        dispatch(setLoading());

        return {
            success: true,
        };
    }

    return {
        success: false,
        message: 'User already added to the list',
    };
};

/**
 * Get the all the live streams from the favorites list
 */
export const getLiveStreams = (): AppThunk<void> => async (dispatch, getState) => {
    // await fetchToken();

    // const followers: GetUserFollow[] = await getUserFollowers("57449892");
    // console.log(followers)
    const followers = ["46088304","439996027","88787265","57781936","104320683","191707410","183609868","36029255","40004867","94996189","236277863","408679510","230233150","161562524","26261471","154918765","81028769","560522026","490774600","87470011","36851493","106211068","100841572","417672570","217900337","31391096","75252743","38602876","162792265","212386483","410946700","433732073","41458426","104873635","451802975","216301138","147749500","106587512","194816862","46935662","520396966","72433606","30683070","124422593","30530672","222623351","420628647","32061048","211992816","133662559","2943498","265591431","242984551","32209489","59560811","42164668","506634115","86098034","131415728","129408736","156377221","42889331","500882075","147124594","44816751","49284001","87477627","121632236","422617778","79294007","63782381","148389712","55800909","47189736","102610592","134543640","29338954","42028083","22016393","141622532","95136385","59336873","85101026","39393054","135153857","187084800","71508341","30356199","124551443","39393036","122208625","156490953","153637327","126902046","117561707","136785688","72882161","32190086","24950469","44329864","39188299","68475506","37799181","93546455","92630241","29039515","38718052","72739314","94658398","40159260","151048942","66022235","41257368","46706329","153370370","137877973","151811659","81580013","46717011","44786653","60917582","43045369","46768129","107305687","69638713","96116107","66311092","66396496","37287763","51993057","35739604","37402112","11344602","40648025","20612870","37646135","125601670","84019001","29122976","23400864","19190208","43566092","26788622","241444","103810560","91188677","26921830","31674979","22212874","94371731","26490481","24631624","11198364","30987575","39964076","11001241","12578353","27617001","38019007","63142572","67802451","63268167","28313735","51706294","37913834","67334320","92254187","29677948","83952550","47207941","8014563","42680768","39642599","38558904","38593322","36495230","39393023","63218988","27942990","31282189","30656820","59841321","40570590","38024128","28653498","36173712","31650615","39722173","29299425"];
    console.log(followers.length)
    const liveStreams: FollowedLivestream[] = await getFollowedLivestreams(followers.map(follow => follow));
    console.log(liveStreams)

    // liveStreams.map(async (stream: GetStreamsData): LivestreamData => {
    //     const user: GetUser = await getUser(stream.user_id);
    //     return {
    //         display_name: user.display_name,
    //         game: stream.
    //     }
    // })

    // dispatch(resetLiveStreams());
    // dispatch(loadFavorites());
    //
    // const favorites: TwitchUserInfo[] = getState().twitch.favoriteStreamers;
    //
    // if (!favorites.length) return;
    //
    // dispatch(setLoading());
    //
    // const results = await Promise.allSettled(
    //     favorites.map((streamer: TwitchUserInfo) => getTwitchLiveInfo(streamer._id)),
    // );
    //
    // results.forEach((response) => {
    //     if (response.status === 'fulfilled') {
    //         response.value && dispatch(addStream(response.value));
    //     } else console.error(response.reason);
    // });
    //
    // dispatch(sortByViewers());
    //
    // dispatch(setLoading());
};

/**
 * Removes a streamer from the favorites list
 * @param {string} streamer - Streamer username to be removed
 */
export const removeStream = (streamer: string): AppThunk<void> => async (dispatch, getState) => {
    const favorites: TwitchUserInfo[] = getState().twitch.favoriteStreamers;

    const newFavorites: TwitchUserInfo[] = favorites.filter(
        (element: TwitchUserInfo) => element.name.toLowerCase() !== streamer.toLowerCase(),
    );

    dispatch(saveFavoriteStreamers(newFavorites));
    setStorageData(FAVORITE_STREAMERS_STORAGE_KEY, JSON.stringify(newFavorites));
};

export const { reducer: twitchReducer } = twitchSlice;
