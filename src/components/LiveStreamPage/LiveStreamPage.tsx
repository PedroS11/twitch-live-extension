import {LiveStreamFooter} from "./LiveStreamFooter/LiveStreamFooter";
import React from "react";
import {LiveStreamList} from "./LiveStreamList/LiveStreamList";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";

export const LiveStreamPage = () => {
    const {loading} = useSelector((state: RootState) => state.common);
    const {liveStreams} = useSelector((state:RootState) => state.twitch);

    return (
        <div>
            <LiveStreamList loading={loading} liveStreams={liveStreams}/>
            <LiveStreamFooter/>
        </div>
    )
};