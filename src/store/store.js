import { configureStore } from "@reduxjs/toolkit";

import watchlistReducer from './slices/watchlistSlice';

const store = configureStore({
    reducer: {
        watchlist: watchlistReducer,
    }
})

export default store;