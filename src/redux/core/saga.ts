import { all } from 'redux-saga/effects';
import LoadSagas from 'redux/sagas';

export default function* reduxSaga() {
  yield all(LoadSagas);
}