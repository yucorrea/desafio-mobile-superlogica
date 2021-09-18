import { createSlice } from "@reduxjs/toolkit";
import { Character } from "../../@types/character";

const initialState = {
    character: {} as Character
}

const selectedCharacter = createSlice({
    name: "selectedCharacter",
    initialState,
    reducers: {
        setCharacter(state, { payload }) {
            state.character = payload
        }
    }
})


export const { setCharacter } = selectedCharacter.actions
export default selectedCharacter.reducer