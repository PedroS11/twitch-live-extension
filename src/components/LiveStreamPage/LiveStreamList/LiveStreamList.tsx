import React from 'react'
import {TwitchLiveInfo} from "../../../infrastructure/twitch/twitchApi";
import {LiveStreamListItem} from "../LiveStreamListItem/LiveStreamListItem";

import './LiveStreamList.css';
import {List} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface LiveStreamListProps {
    liveStreams: TwitchLiveInfo[],
    loading: Boolean
}

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        maxHeight: 200,
    }
});

export const LiveStreamList = ({liveStreams, loading}: LiveStreamListProps) => {
    const classes = useStyles();
    return (
        <div>
            {liveStreams.length > 0
            && <List className={classes.root}>
                {liveStreams.map((elem: TwitchLiveInfo) =>
                    <LiveStreamListItem {...elem} key={elem._id}/>
                )}
            </List>
            }
            {!loading && liveStreams.length === 0 &&
            <div className="no-streams-message">All the channels are offline :(</div>}

            {loading && (
                <div className="d-flex justify-content-center loading-div">
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    )
};