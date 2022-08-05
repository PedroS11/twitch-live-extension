import React from 'react';

import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FollowedLivestream } from '../../../domain/infrastructure/twitch/twitch';
import { LiveStreamListItem } from './LiveStreamListItem/LiveStreamListItem';
import clsx from 'clsx';
import { CenteredCircularProgress } from '../../../components/Progress/CenteredCircularProgress';

interface LiveStreamListProps {
    liveStreams: FollowedLivestream[];
    className?: any;
    onScroll?: (event: any) => void;
    loadingMore?: boolean;
}

export const MAX_HEIGHT = 400;

const useStyles = makeStyles({
    list: {
        maxHeight: MAX_HEIGHT,
        overflow: 'auto',
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

export const LiveStreamList = ({
    liveStreams,
    className,
    onScroll,
    loadingMore,
}: LiveStreamListProps) => {
    const classes = useStyles();

    return (
        <List className={clsx(classes.list, className)} onScroll={onScroll}>
            {liveStreams.map((elem: FollowedLivestream) => (
                <LiveStreamListItem {...elem} key={elem.id} />
            ))}
            {loadingMore && <CenteredCircularProgress />}
        </List>
    );
};
