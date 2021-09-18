import { all, takeLatest, put } from "redux-saga/effects"

import { setFilterCharacters } from "../reducers/character";
import { removeFavoriteCharacter } from "../reducers/favorite";

function* favoriteCharacterRequest() {
    yield put(setFilterCharacters({}))
}

function* watchRequestCharacterRemove() {
    yield takeLatest(removeFavoriteCharacter, favoriteCharacterRequest)
}

function* root() {
    yield all([watchRequestCharacterRemove()])
}

export default root