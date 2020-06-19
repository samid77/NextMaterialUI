import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { MitraDataAction } from '../../interfaces/MitraData';
import { getMitraData, mitraDataSuccess, mitraDataError, addMitraDataSuccess, addMitraDataError } from '../actions/MitraDataAction';
import { GET_MITRA, ADD_MITRA, UPDATE_MITRA, DELETE_MITRA } from '../constants/MitraConstants';
import Axios from 'axios';
import { HttpService } from '../../helpers/HttpService';
  
function* workerSagaMitraData(action: MitraDataAction) {
    try {
        const data = {
            ...action.data
        };

        const response = yield call(HttpService.get, 'http://localhost:3001/datamitra', {});
        
        if (response.status === 200 && response.data.length > 0) {
            yield put(mitraDataSuccess(response.data));
        } else {
            yield put(mitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(mitraDataError(error.message));
    }
}

function* workerSagaAddMitraData(action: MitraDataAction) {
    try {
        const data: object = {
            nama: action.data.nama,
            tanggalPKS: action.data.pksStartDate,
            pksStartDate: action.data.pksStartDate,
            pksEndDate: action.data.pksEndDate,
            tanggalLimit: action.data.limitStartDate,
            limitStartDate: action.data.limitStartDate,
            limitEndDate: action.data.limitEndDate,
            targetUnit: action.data.targetUnit,
            maxLimit: action.data.maxLimit,
            targetNominal: action.data.targetNominal,
            approvalStatus: action.data.approvalStatus,
            createdAt: action.data.createdAt
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        console.log(`data: ${JSON.stringify(data)}`);
        const response = yield call(HttpService.post, 'http://localhost:3001/datamitra', data, headers);

        if (response.status === 200 && response.data.length > 0) {
            console.log(response.data);
            yield put(addMitraDataSuccess(response.data));
            yield put(getMitraData(''));
        } else {
            yield put(addMitraDataError(response.statusText));
        }

    } catch (error) {
        yield put(addMitraDataError(error.message));
    }
}


export const watcherMitraData = [
    takeLatest(GET_MITRA, workerSagaMitraData),
    takeLatest(ADD_MITRA, workerSagaAddMitraData),
];
  