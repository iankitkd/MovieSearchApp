import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contents: [],
}

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        addToWatchlist: (state, action) => {
            const content = action.payload;
            if(!state.contents.some(c => c.id === content.id)) {
                state.contents.push(content);
            }
        },

        removeFromWatchlist: (state, action) => {
            const contentId = action.payload;
            state.contents = state.contents.filter(c => c.id !== contentId);
        }
    }
})

export const {addToWatchlist, removeFromWatchlist} = watchlistSlice.actions;
export const selectWatchlist = (state) => state.watchlist.contents;
export default watchlistSlice.reducer;