import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { rootReducer, RootState } from './reducers/rootReducer';

export type AppDispatch = typeof store.dispatch;
export type AppThunk<R> = ThunkAction<R, RootState, unknown, Action<string>>;

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});
