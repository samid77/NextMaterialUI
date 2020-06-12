import { combineReducers } from 'redux';
import { configReducer as LoadReducers, HookReducer } from '../config';

const reduxReducer = combineReducers(LoadReducers);

export type AppState = ReturnType<typeof reduxReducer>

const RootReducer: any = (state: any, action: any) => {
  const hook = HookReducer(state, action);
  return reduxReducer(hook.state, hook.action);
};

export default RootReducer;
