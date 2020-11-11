import React from 'react';

import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FollowedLivestream } from '../../../domain/infrastructure/twitch/twitch';
import { LiveStreamListItem } from './LiveStreamListItem/LiveStreamListItem';

interface LiveStreamListProps {
    liveStreams: FollowedLivestream[];
}

const useStyles = makeStyles({
    root: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    list: {
        overflow: 'auto',
        maxHeight: 400,
        paddingTop: 0,
        paddingBottom: 0,
        '&::-webkit-scrollbar': {
            width: '0.6em',
        },
        '&::-webkit-scrollbar-track': {
            borderRadius: 10,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',
            borderRadius: 10,
        },
    },
});

export const LiveStreamList = ({ liveStreams }: LiveStreamListProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {liveStreams.length > 0 && (
                <List className={classes.list}>
                    {liveStreams.map((elem: FollowedLivestream) => (
                        <LiveStreamListItem {...elem} key={elem.id} />
                    ))}
                </List>
            )}
        </div>
    );
};
