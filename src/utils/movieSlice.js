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
        addPopularMovie:(state , action) =>{
            state.PopularMovie = action.payload;
        },
        addTopRated:(state , action) =>{
            state.TopRated = action.payload;
        },
        addUpComing:(state , action) =>{
            state.UpComing = action.payload;
        },
        addTrailerVideo: (state, action) =>{
            state.trailerVideo = action.payload;
        },
    },
    
})

export const {addnowPlayingMovie, addTrailerVideo, addPopularMovie,addTopRated , addUpComing} = movieSlice.actions;

export default movieSlice.reducer;