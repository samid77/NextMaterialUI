import MitraDataReducers from './MitraDataReducers';
import ProdukDataReducers from './ProdukDataReducers';
import LayoutReducers from './LayoutReducers';
import { combineReducers } from 'redux';

const AppReducers = combineReducers({
  mitraData: MitraDataReducers,
  produkData: ProdukDataReducers,
  layout: LayoutReducers
});

export type AppState = ReturnType<typeof AppReducers>;

export {
  AppReducers
};