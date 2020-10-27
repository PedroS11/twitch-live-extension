import React from 'react'
import {LiveStreamListItem} from "../LiveStreamListItem/LiveStreamListItem";

import {CircularProgress, List, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TwitchLiveInfo} from "../../../domain/infrastructure/twitch/twitchApi";

interface LiveStreamListProps {
    liveStreams: TwitchLiveInfo[],
    loading: Boolean
}

const useStyles = makeStyles({
    root: {
        paddingTop: 5,
        paddingBottom: 5
    },
    list: {
        overflow: 'auto',
        maxHeight: 400,
        paddingTop: 0,
        paddingBottom: 0,
        '&::-webkit-scrollbar': {
            width: '0.6em'
        },
        '&::-webkit-scrollbar-track': {
            borderRadius: 10
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',
            borderRadius: 10

        }
    },
    loadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    loadingElem: {
        color: '#FFFFFF'
    }
});

export const LiveStreamList = ({liveStreams, loading}: LiveStreamListProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {!loading && liveStreams.length > 0
            && <List className={classes.list}>
                {liveStreams.map((elem: TwitchLiveInfo) =>
                    <LiveStreamListItem {...elem} key={elem._id}/>
                )}
            </List>
            }
            {!loading && liveStreams.length === 0 &&
            <Typography align={"center"}>Your favorite channels are all offline...</Typography>}

            {loading && (
                <div className={classes.loadingDiv}>
                    <CircularProgress className={classes.loadingElem} size={30}/>
                </div>
            )}
        </div>
    )
};