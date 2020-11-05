import { LiveStreamFooter } from './LiveStreamFooter/LiveStreamFooter';
import React, { useEffect } from 'react';
import { LiveStreamList } from './LiveStreamList/LiveStreamList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { getLiveStreams } from '../../store/reducers/twitchReducer';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CenteredCircularProgress } from '../../components/Progress/CenteredCircularProgress';
import { AppDispatch } from '../../store/store';

const useStyles = makeStyles({
    optionsMessage: {
        fontStyle: 'italic',
    },
});

export const LiveStreamPage = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const { loading } = useSelector((state: RootState) => state.common);
    const { liveStreams, favoriteStreamers } = useSelector((state: RootState) => state.twitch);

    useEffect(() => {
        dispatch(getLiveStreams());
    }, [dispatch]);

    return (
        <div>
            {!loading && favoriteStreamers.length === 0 && (
                <Typography align={'center'} variant={'subtitle2'} className={classes.optionsMessage}>
                    Go to Options and add your streamers
                </Typography>
            )}
            {!loading && favoriteStreamers.length > 0 && liveStreams.length === 0 && (
                <Typography align={'center'}>Your favorite channels are all offline...</Typography>
            )}
            {!loading && favoriteStreamers.length > 0 && <LiveStreamList liveStreams={liveStreams} />}
            {loading && <CenteredCircularProgress />}
            <LiveStreamFooter />
        </div>
    );
};
