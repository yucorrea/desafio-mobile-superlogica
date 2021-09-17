import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../@types/character";

const initialState = {
    favorites: [] as Character[],
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: { 
        addFavoriteCharacter(state, { payload } : PayloadAction<Character>) {
            state.favorites = [...state.favorites, payload]
        },
        removeFavoriteCharacter(state, { payload } : PayloadAction<Character>) {
            state.favorites  = state.favorites.filter(character => character.id !== payload.id)
        }
    }
})

export const {
    addFavoriteCharacter, 
    removeFavoriteCharacter, 
}  = favoriteSlice.actions


export const selectFavorite = state => state.favorite

export default favoriteSlice.reducer;

