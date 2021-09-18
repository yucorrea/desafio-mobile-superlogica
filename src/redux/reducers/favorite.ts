import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    favorites: [] as Array<number>,
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: { 
        addFavoriteCharacter(state, { payload } : PayloadAction<number>) {
            state.favorites = [...state.favorites, payload]
        },
        removeFavoriteCharacter(state, { payload } : PayloadAction<number>) {
            state.favorites  = state.favorites.filter(id => id !== payload)
        }
    }
})

export const {
    addFavoriteCharacter, 
    removeFavoriteCharacter, 
}  = favoriteSlice.actions


export const selectFavorite = (state : RootState) => state.favorite

export default favoriteSlice.reducer;

