import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonStore } from '../../domain/store/commonStore';

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        loading: false,
        loadingMore: false,
        loadingMoreFinished: false,
    } as CommonStore,
    reducers: {
        setLoading(state: CommonStore) {
            state.loading = !state.loading;
        },
        setLoadingMore(state: CommonStore) {
            state.loadingMore = !state.loadingMore;
        },
        setLoadFinished(state: CommonStore, { payload }: PayloadAction<boolean>) {
            state.loadingMoreFinished = payload;
        },
    },
});

export const { reducer: commonReducer } = commonSlice;

export const { setLoading, setLoadingMore, setLoadFinished } = commonSlice.actions;
