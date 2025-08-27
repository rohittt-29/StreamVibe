import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState:{
        nowPlayingMovie: null,
        trailerVideo: null,
        PopularMovie: null,
        TopRated: null,
        UpComing: null,
        loading: {
            nowPlaying: false,
            popular: false,
            topRated: false,
            upcoming: false,
            trailer: false
        },
        errors: {
            nowPlaying: null,
            popular: null,
            topRated: null,
            upcoming: null,
            trailer: null
        }
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
        setLoading: (state, action) => {
            const { key, loading } = action.payload;
            if (state.loading.hasOwnProperty(key)) {
                state.loading[key] = loading;
            }
        },
        setError: (state, action) => {
            const { key, error } = action.payload;
            if (state.errors.hasOwnProperty(key)) {
                state.errors[key] = error;
            }
        },
        clearErrors: (state) => {
            Object.keys(state.errors).forEach(key => {
                state.errors[key] = null;
            });
        }
    },
    
})

export const {
    addnowPlayingMovie, 
    addTrailerVideo, 
    addPopularMovie,
    addTopRated, 
    addUpComing,
    setLoading,
    setError,
    clearErrors
} = movieSlice.actions;

export default movieSlice.reducer;