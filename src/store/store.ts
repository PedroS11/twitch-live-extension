import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";

import {rootReducer, RootState} from "./reducers/rootReducer";

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});