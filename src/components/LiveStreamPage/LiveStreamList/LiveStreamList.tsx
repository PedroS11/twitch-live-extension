import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getLiveStreams} from '../../../store/reducers/twitchReducer';
import {RootState} from "../../../store/reducers/rootReducer";
import {TwitchLiveInfo} from "../../../infrastructure/twitch/twitchApi";
import {LiveStreamListItem} from "../LiveStreamListItem/LiveStreamListItem";

import './LiveStreamList.css';
import {LiveStreamFooter} from "../LiveStreamFooter/LiveStreamFooter";

export const LiveStreamList = () => {
    const dispatch = useDispatch();

    const {loading} = useSelector((state: RootState) => state.common);
    const {liveStreams, streamerNames} = useSelector((state: RootState) => state.twitch);


    return (
        <div>
            {liveStreams.length > 0
                ? <ul style={{paddingBottom: 4}}>
                    {liveStreams.map((elem: TwitchLiveInfo) =>
                        <li key={elem._id}>
                            <LiveStreamListItem {...elem}/>
                        </li>
                    )}
                </ul>
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