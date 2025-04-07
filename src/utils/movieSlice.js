import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState:{
        nowPlayingMovie: null,
        trailerVideo: null,
    },
    reducers:{
        addnowPlayingMovie:(state , action) =>{
            state.nowPlayingMovie = action.payload;
        },
        addTrailerVideo: (state, action) =>{
            state.trailerVideo = action.payload;
        },
    },
    
})

export const {addnowPlayingMovie, addTrailerVideo} = movieSlice.actions;

export default movieSlice.reducer;