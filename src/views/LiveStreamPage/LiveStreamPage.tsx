import {LiveStreamFooter} from "./LiveStreamFooter/LiveStreamFooter";
import React, {useEffect} from "react";
import {LiveStreamList} from "./LiveStreamList/LiveStreamList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getLiveStreams, loadFavorites} from "../../store/reducers/twitchReducer";

export const LiveStreamPage = () => {
    const {loading} = useSelector((state: RootState) => state.common);
    const {liveStreams, favoriteStreamers} = useSelector((state:RootState) => state.twitch);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLiveStreams());
        // dispatch(loadFavorites())
    }, [favoriteStreamers]);

    return (
        <div>
            <LiveStreamList loading={loading} liveStreams={liveStreams}/>
            {liveStreams.length > 0 && <LiveStreamFooter/>}
        </div>
    )
};