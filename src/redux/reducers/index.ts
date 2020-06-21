import MitraDataReducers from './MasterDataMitraReducer';
import LayoutReducers from './LayoutReducer';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
  mitraData: MitraDataReducers,
  layout: LayoutReducers
});

export type AppState = ReturnType<typeof AppReducers>;

export {
  AppReducers
};