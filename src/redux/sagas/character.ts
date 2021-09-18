import { all, takeLatest, call, put, select } from "redux-saga/effects"
import { getAllCharacters, addCharacters, setFilterCharacters } from "../reducers/character";

import api from "../../services/api";

function* filterRequest() {
    try {
        //@ts-ignore
        const { character: { filter, currentPage }, favorite } = yield select(state => state)

        const { search, option } = filter

        if (option === 2 &&
            favorite.favorites &&
            favorite.favorites.length > 0
        ) {

            //@ts-ignore
            const response = yield call(api.get, `character/${favorite.favorites.toString()}`)

            const characters = response.data.length > 1 ? response.data : [response.data]
            const filteredFavorite = characters.filter(character => character.name.includes(search))

            yield put(addCharacters({ characters: filteredFavorite, totalPage: 0 }))

        } else if (option === 1) {

            //@ts-ignore
            const response = yield call(api.get, `character?name=${search}&page=${currentPage}`)

            yield put(addCharacters({
                characters: [...response.data.results],
                totalPage: response.data.info.pages
            }))
        } else {
            yield put(addCharacters({characters: []}))
        }
    } catch (err) {
        yield put(addCharacters({characters: []}))
    }
}

function* watchRequestFilter() {
    yield takeLatest(setFilterCharacters, filterRequest)
}

function* watchRequestCharacter() {
    yield takeLatest(getAllCharacters, filterRequest)
}

function* root() {
    yield all([
        watchRequestCharacter(),
        watchRequestFilter()
    ])
}

export default root