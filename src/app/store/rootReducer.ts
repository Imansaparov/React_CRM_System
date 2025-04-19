import { combineReducers } from '@reduxjs/toolkit';
import moviesReducer from '@/entities/movie/model/moviesSlice';

export const rootReducer = combineReducers({
    movies: moviesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;