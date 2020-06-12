import { call, put, takeLatest } from 'redux-saga/effects';
import { Action, Auth } from '../../interfaces';
import { SIGNINAPI } from './Login.constants';
import { fetchLoginSuccess, fetchLoginFailed, FETCH_LOGIN } from './Login.actions';
import { HttpService } from '../../helpers';

function* workerSagaLogin(params: Action) {
  try {
    const data: object = {
      username: params.data.username,
      password: params.data.password,
    };

    const headers = {
      information: params.data.password,
    };

    const response = yield call(HttpService.post, SIGNINAPI, data, headers);

    if (!response.data) throw response;

    if (response.status === 200) {
      const parseResponse: Auth = {
        ...response.data,
      };

      yield put(fetchLoginSuccess(parseResponse));
    } else {
      yield put(fetchLoginFailed(response.data.message));
    }
  } catch (error) {
    console.log(error.message);
    yield put(fetchLoginFailed(error.message));
  }
}

export const watcherSagaLogin = [takeLatest(FETCH_LOGIN, workerSagaLogin)];
