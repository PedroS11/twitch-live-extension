import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getLiveStreams} from '../../store/reducers/twitchReducer';
import {RootState} from "../../store/reducers/rootReducer";
import {TwitchLiveInfo} from "../../infrastructure/twitch/twitchApi";
import {StreamListItem} from "../StreamListItem/StreamListItem";

import './StreamList.css';

export const StreamList = () => {
    const dispatch = useDispatch();

    const {loading} = useSelector((state: RootState) => state.common);
    const {liveStreams} = useSelector((state: RootState) => state.twitch);

    // align-items-center justify-content-left
    return (
        <div style={{backgroundColor: "white"}}>
            <h3 style={{textAlign: "center", color: "#a96fff"}}>Twitch Live</h3>
            <ul>
                {liveStreams.map((elem: TwitchLiveInfo) =>
                    <li key={elem._id}>
                        <StreamListItem {...elem}/>
                    </li>
                )}
            </ul>
        </div>
    )
};