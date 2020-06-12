import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import { actionTypes, failure, loadDataSuccess, tickClock, fetchLogin, fetchLoginSuccess, fetchLoginFailed } from './actions'
import { HttpService } from './helpers/HttpService';

function* runClockSaga() {
  yield take(actionTypes.START_CLOCK)
  while (true) {
    yield put(tickClock(false))
    yield delay(1000)
  }
}

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(loadDataSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}


function* workerSagaLogin(params: Action) {
  console.log(`WorkerSaga called: ${params.data.email}`)
  try {
    const data: object = {
      email: params.data.email,
      password: params.data.password,
    };

    console.log(`data: ${JSON.stringify(data)}`)

    const headers = {
      information: params.data.password,
    };

    // const response = yield call(HttpService.post, 'http://localhost:5000/auth', data, headers);

    const response = yield fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: params.data.email,
        password: params.data.password,
      })
    })

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
    console.log(`Error in saga: ${error.message}`);
    yield put(fetchLoginFailed(error.message));
  }
}


function* rootSaga() {
  yield all([
    call(runClockSaga),
    takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
    takeLatest(actionTypes.FETCH_LOGIN, workerSagaLogin),
  ])
}

export default rootSaga
