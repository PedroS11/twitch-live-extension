import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CommonStore {
    loading: boolean;
}

const initialState: CommonStore = {
    loading: false
};

const commomnSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setLoading(state: CommonStore) {
            state.loading = !state.loading;
        },
        updateLoading(state: CommonStore, {payload}: PayloadAction<boolean>) {
            state.loading = payload
        }
    }
});

export const {reducer: commonReducer} = commomnSlice;

export const {setLoading, updateLoading} = commomnSlice.actions;