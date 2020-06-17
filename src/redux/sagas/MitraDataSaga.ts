import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { MitraDataAction } from '../../interfaces/MitraData';
import { mitraDataSuccess, mitraDataError } from '../actions/MitraDataAction';
import { GET_MITRA } from '../constants/MitraConstants';
import Axios from 'axios';
import { HttpService } from '../../helpers/HttpService';
  
function* workerSagaMitraData(action: MitraDataAction) {
    console.log('masuk');
    try {
        const data = {
            ...action.data
        };

        const response = yield call(HttpService.get, 'http://localhost:3001/datamitra', {});
        console.log(response);
        if (response.status === 200 && response.data.length > 0) {
            console.log(response.data);
            yield put(mitraDataSuccess(response.data));
        } else {
            yield put(mitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(mitraDataError(error.message));
    }
}

export const watcherMitraData = [
    takeLatest(GET_MITRA, workerSagaMitraData),
];
  