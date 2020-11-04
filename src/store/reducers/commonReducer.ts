import { createSlice } from '@reduxjs/toolkit';
import { CommonStore } from '../../domain/store/commonStore';

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        loading: false,
    },
    reducers: {
        setLoading(state: CommonStore) {
            state.loading = !state.loading;
        },
    },
});

export const { reducer: commonReducer } = commonSlice;

export const { setLoading } = commonSlice.actions;
