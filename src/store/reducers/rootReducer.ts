import { combineReducers } from '@reduxjs/toolkit';
import { commonReducer } from './commonReducer';
import { twitchReducer } from './twitchReducer';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    common: commonReducer,
    twitch: twitchReducer,
});
