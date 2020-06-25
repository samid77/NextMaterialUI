import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { AppReducers } from '../reducers';
import persistConfig from './persist';
import reduxSaga from './saga';


const persistedReducer = persistReducer(persistConfig.storeConfig, AppReducers);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const reduxStore = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(reduxSaga);

const Persistore: any = persistStore(reduxStore);
const Store = reduxStore;

export {
  Persistore,
  Store
}