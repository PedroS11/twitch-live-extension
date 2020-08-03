import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CommonStore {
    loading: boolean;
    page: 'LIVE'|'SETTINGS';
}

const initialState: CommonStore = {
    loading: true,
    page: "LIVE"
};

const commomnSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setLoading(state: CommonStore) {
            state.loading = !state.loading;
        },
        goToSettings(state: CommonStore) {
            if(state.page !== 'SETTINGS') {
                state.page = 'SETTINGS';
            }
        }
    }
});

export const {reducer: commonReducer} = commomnSlice;

export const {setLoading, goToSettings} = commomnSlice.actions;