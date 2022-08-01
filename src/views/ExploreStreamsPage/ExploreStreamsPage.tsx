import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import React, { useEffect } from 'react';
import {
    getMoreTopLiveStreams,
    getTopLiveStreams,
    resetTopLivestreams,
} from '../../store/reducers/twitchReducer';
import { Typography } from '@material-ui/core';
import {
    LiveStreamList,
    MAX_HEIGHT,
    PADDING_TOP,
} from '../LiveStreamPage/LiveStreamList/LiveStreamList';
import { CenteredCircularProgress } from '../../components/Progress/CenteredCircularProgress';

const isAtTheBottom = (event: any): boolean => {
    // The total height you can scroll
    const liveStreamListScrollHeight: number = event.target.scrollHeight;
    const scrollPosition: number = event.target.scrollTop;

    return scrollPosition + MAX_HEIGHT + PADDING_TOP >= liveStreamListScrollHeight;
};

export const ExploreStreamsPage = () => {
    const dispatch: AppDispatch = useDispatch();

    const { loading, loadingMore, loadingMoreFinished } = useSelector(
        (state: RootState) => state.common,
    );
    const { topLivestreams } = useSelector((state: RootState) => state.twitch);

    const loadMoreItems = (event: any) => {
        if (isAtTheBottom(event) && !loadingMoreFinished && !loadingMore) {
            dispatch(getMoreTopLiveStreams());
        }
    };

    useEffect(() => {
        dispatch(getTopLiveStreams());
        return () => dispatch(resetTopLivestreams());
    }, [dispatch]);

    return (
        <div>
            {!loading && topLivestreams.length === 0 && (
                <Typography align={'center'}>Your followed channels are all offline...</Typography>
            )}
            {!loading && topLivestreams.length > 0 && (
                <LiveStreamList
                    liveStreams={topLivestreams}
                    onScroll={(e: any) => loadMoreItems(e)}
                    loadingMore={loadingMore}
                />
            )}
            {loading && <CenteredCircularProgress />}
        </div>
    );
};
