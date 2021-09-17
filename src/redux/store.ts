import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";

import { persistStore, persistReducer} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites']
};

import { all } from "redux-saga/effects";

import createSagaMiddleware from "redux-saga";

import characterReducer from './reducers/character';
import favoriteReducer from './reducers/favorite';

/* Reducers */ 
const reducers = combineReducers({
  character: characterReducer,
  favorite:  persistReducer(persistConfig, favoriteReducer),
});

/* Sagas */ 
export const rootSagas = function* rootSagas(): any {
  return yield all([ ]);
};

/* Store and middlewares configuration */ 
const sagaMiddleware = createSagaMiddleware({});

const middlewares: any = [];
middlewares.push(sagaMiddleware);

const Store = createStore(reducers, compose(applyMiddleware(...middlewares)));
const Persistor = persistStore(Store)

sagaMiddleware.run(rootSagas);

export { Store, Persistor };
