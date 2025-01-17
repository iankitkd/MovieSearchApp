import { configureStore } from "@reduxjs/toolkit";

import watchlistReducer from './slices/watchlistSlice';
import userLocationReducer from './slices/userLocationSlice';
import currentTabReducer from './slices/currentTabSlice';

const store = configureStore({
    reducer: {
        watchlist: watchlistReducer,
        userLocation: userLocationReducer,
        currentTab: currentTabReducer,
    }
})

export default store;