import { createSlice } from "@reduxjs/toolkit";

import { getUserLocation } from "../../services/locationService";

const initialState = {
    countryCode: null
}

const userLocationSlice = createSlice({
    name: "userLocation",
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.countryCode = action.payload;
        },
        clearLocation: (state) => {
            state.countryCode = null;
        }
    }
})

export const {setLocation, clearLocation} = userLocationSlice.actions;

export const fetchUserLocation = () => 
    async (dispatch) => {
        try {
            const location = await getUserLocation();
            dispatch(setLocation(location));
          } catch (error) {
            console.log("fetchUserLocation error",error);
          }        
    }

export default userLocationSlice.reducer;