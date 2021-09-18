import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../@types/character";
import { RootState } from "../store";

const initialState = {
    characters: [] as Character[],
    filter: {
        search: '',
        option: 1,
    },
    isLoading: false,
    currentPage: 1,
    totalPage: 0
}

const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        getAllCharacters() { },
        addCharacters(state, { payload } ) {
            state.characters = state.currentPage === 1 ? 
            payload.characters : [...state.characters, ...payload.characters
            ]
            state.totalPage = payload.totalPage
            state.isLoading = false
            state.currentPage = state.currentPage + 1
        },
        setFilterCharacters(state, { payload }) {
            state.filter = { ...state.filter, ...payload } 
            state.currentPage = 1
        },
        setLoading(state, { payload }) {
            state.isLoading = payload
        }
    }
})

export const {
    getAllCharacters,
    addCharacters,
    setFilterCharacters,
    setLoading
} = characterSlice.actions


export const selectCharacter = (state: RootState) => state.character

export default characterSlice.reducer;

