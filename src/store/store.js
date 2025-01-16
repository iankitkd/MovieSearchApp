import { configureStore } from "@reduxjs/toolkit";

import watchlistReducer from './slices/watchlistSlice';
import userLocationReducer from './slices/userLocationSlice'

const store = configureStore({
    reducer: {
        watchlist: watchlistReducer,
        userLocation: userLocationReducer,
    }
})

export default store;