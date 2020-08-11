import React from 'react'
import {TwitchLiveInfo} from "../../../infrastructure/twitch/twitchApi";
import {LiveStreamListItem} from "../LiveStreamListItem/LiveStreamListItem";

import './LiveStreamList.css';

interface LiveStreamListProps {
    liveStreams: TwitchLiveInfo[],
    loading: Boolean
}

export const LiveStreamList = ({liveStreams, loading}: LiveStreamListProps) => {
    return (
        <div>
            {liveStreams.length > 0
                ? <div  style={{paddingBottom: 4}} className="stream-list">
                    {liveStreams.map((elem: TwitchLiveInfo) =>
                            <LiveStreamListItem {...elem}/>
                    )}
                </div>
                : <div style={{textAlign: "center"}}>All the channels are offline :(</div>
                }

            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    )
};