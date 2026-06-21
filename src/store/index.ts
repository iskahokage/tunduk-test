import {configureStore} from '@reduxjs/toolkit';
import {candidateApi} from '../services/api';

export const store = configureStore({
    reducer: {
        [candidateApi.reducerPath]: candidateApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(candidateApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

