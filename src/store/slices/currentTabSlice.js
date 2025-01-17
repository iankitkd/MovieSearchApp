import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trendingTab: null,
    movieTab: null,
    tvTab: null,
}

const currentTabSlice = createSlice({
    name: 'currentTab',
    initialState,
    reducers: {
        setTrendingTab: (state, action) => {
            state.trendingTab = action.payload;
        },
        setMovieTab: (state, action) => {
            state.movieTab = action.payload;
        },
        setTvTab: (state, action) => {
            state.tvTab = action.payload;
        }
    }
})

export const {setTrendingTab, setMovieTab, setTvTab} = currentTabSlice.actions;
export default currentTabSlice.reducer;