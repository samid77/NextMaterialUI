import { all } from 'redux-saga/effects';
import LoadSagas from '../sagas';

export default function* reduxSaga() {
  yield all(LoadSagas);
}