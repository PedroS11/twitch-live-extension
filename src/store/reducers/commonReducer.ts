import {createSlice} from "@reduxjs/toolkit";

interface CommonStore {
    loading: boolean;
}

const initialState: CommonStore = {
    loading: false,
};

const commomnSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setLoading(state: CommonStore) {
            state.loading = !state.loading;
        }
    }
});

export const {reducer: commonReducer} = commomnSlice;

export const {setLoading} = commomnSlice.actions;