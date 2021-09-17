import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../@types/character";
import { RootState } from "../store";

const initialState = {
    characters: [] as Character[],
    filtering: false
}

const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: { 
        addCharacters(state, { payload } : PayloadAction<Character[]>) {
            state.characters = payload
        },
        setFiltering(state, { payload } : PayloadAction<boolean>) {
            state.filtering  = payload
        },
    }
})

export const {
    addCharacters,
    setFiltering
}  = characterSlice.actions


export const selectCharacter = (state : RootState ) => state.character

export default characterSlice.reducer;

