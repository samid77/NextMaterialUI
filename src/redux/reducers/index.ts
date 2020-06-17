import MitraDataReducers from "./MasterDataMitraReducer";
import { combineReducers } from "redux";

const AppReducers = combineReducers({
  mitraData: MitraDataReducers
});

export type AppState = ReturnType<typeof AppReducers>;

export {
  AppReducers
};