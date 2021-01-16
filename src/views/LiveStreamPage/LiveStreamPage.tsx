import { LiveStreamFooter } from './LiveStreamFooter/LiveStreamFooter';
import React, { useEffect } from 'react';
import { LiveStreamList } from './LiveStreamList/LiveStreamList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { getLiveStreams } from '../../store/reducers/twitchReducer';
import { Typography } from '@material-ui/core';
import { CenteredCircularProgress } from '../../components/Progress/CenteredCircularProgress';
import { AppDispatch } from '../../store/store';

export const LiveStreamPage = () => {
    const dispatch: AppDispatch = useDispatch();

    const { loading } = useSelector((state: RootState) => state.common);
    const { livestreams } = useSelector((state: RootState) => state.twitch);

    useEffect(() => {
        dispatch(getLiveStreams());
    }, [dispatch]);

    return (
        <div>
            {!loading && livestreams.length === 0 && (
                <Typography align={'center'}>Your followed channels are all offline...</Typography>
            )}
            {!loading && livestreams.length > 0 && <LiveStreamList liveStreams={livestreams} />}
            {loading && <CenteredCircularProgress />}
            <LiveStreamFooter />
        </div>
    );
};
