import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import reducer from 'redux/core/reducer';
import persist from 'redux/core/persist';
import saga from 'redux/core/saga';

// import { defaultState } from 'configurations/redux';
import { DefaultState } from 'interfaces/index';

const persistedReducer = persistReducer(persist.storeConfig, reducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export function initializeStore(initialState: any) {
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(saga);

  return store;
}
