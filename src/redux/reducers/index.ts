import MitraDataReducers from './MasterDataMitraReducer';
import ProdukDataReducers from './MasterDataProdukReducer';
import LayoutReducers from './LayoutReducer';
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