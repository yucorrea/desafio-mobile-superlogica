import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";

import { all } from "redux-saga/effects";
import { persistStore, persistReducer} from "redux-persist";
import createSagaMiddleware from "redux-saga";
import AsyncStorage from '@react-native-async-storage/async-storage';

import characterReducer from './reducers/character';
import favoriteReducer from './reducers/favorite';
import selectedCharacterReducer from './reducers/selectedCharacter';

import characterSaga from "../redux/sagas/character";
import favoriteSaga from "../redux/sagas/favorite";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites']
};

/* Reducers */ 
const reducers = combineReducers({
  character: characterReducer,
  favorite:  persistReducer(persistConfig, favoriteReducer),
  selectedCharacter: selectedCharacterReducer,
});

/* Sagas */ 
export const rootSagas = function* rootSagas(): any {
  return yield all([ characterSaga(), favoriteSaga()]);
};

/* Store and middlewares configuration */ 
const sagaMiddleware = createSagaMiddleware({});

const middlewares: any = [];
middlewares.push(sagaMiddleware);

const Store = createStore(reducers, compose(applyMiddleware(...middlewares)));
const Persistor = persistStore(Store)

sagaMiddleware.run(rootSagas);

export { Store, Persistor };

export type RootState = ReturnType<typeof Store.getState>