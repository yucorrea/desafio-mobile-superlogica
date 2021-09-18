import { all, takeLatest,  put, call, select } from "redux-saga/effects"
import api from "../../services/api";

import {  addCharacters } from "../reducers/character";
import {  removeFavoriteCharacter } from "../reducers/favorite";

function* favoriteCharacterRequest() {
    const { favorites } = yield select(state => state.favorite)

    if (favorites && favorites.length > 0 ) {
        //@ts-ignore
        const response = yield call(api.get, `character/${favorites.toString()}`)

        const characters = response.data.length > 1 ? response.data : [response.data]
        yield put(addCharacters(characters))
    }else {
        yield put(addCharacters([]))
    }

}

function* watchRequestCharacterRemove() {
    yield takeLatest(removeFavoriteCharacter, favoriteCharacterRequest)
}

function* root() {
    yield all([ watchRequestCharacterRemove() ])
}

export default root