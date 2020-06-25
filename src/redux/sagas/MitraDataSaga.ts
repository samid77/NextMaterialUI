import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { MitraDataAction } from '../../interfaces/MitraData';
import { 
    getMitraData, 
    mitraDataSuccess, 
    mitraDataError, 
    addMitraDataSuccess, 
    addMitraDataError,
    updateMitraDataSuccess, 
    updateMitraDataError,
    deleteMitraDataSuccess, 
    deleteMitraDataError,
    searchMitraData,
    searchMitraDataSuccess, 
    searchMitraDataError,
    resetSearchMitraData
} from '../actions/MitraDataAction';
import { 
    GET_MITRA, 
    ADD_MITRA, 
    ADD_MITRA_SUCCESS, 
    UPDATE_MITRA, 
    UPDATE_MITRA_SUCCESS, 
    DELETE_MITRA,
    DELETE_MITRA_SUCCESS,
    SEARCH_MITRA,
    SEARCH_MITRA_SUCCESS,
    RESET_SEARCH_MITRA
} from '../constants/MitraConstants';
import Axios from 'axios';
import { HttpService } from '../../helpers/HttpService';
  
function* workerSagaMitraData(action: MitraDataAction) {
    try {
        const data = {
            ...action.data
        };

        const response = yield call(HttpService.get, 'http://localhost:3001/datamitra', {});
        
        if (response.status === 200) {
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
        const response = yield call(HttpService.post, 'http://localhost:3001/datamitra', data, headers);

        if (response.status === 201) {
            yield put(addMitraDataSuccess(response.data))
        } else {
            yield put(addMitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(addMitraDataError(error.message));
    }
}

function* workerSagaUpdateMitraData(action: MitraDataAction) {
    try {
        const data: any = {
            id: action.data.id,
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
        const response = yield call(HttpService.put, `http://localhost:3001/datamitra/${data.id}`, data, headers);

        if (response.status === 200) {
            yield put(updateMitraDataSuccess(response.data))
        } else {
            yield put(updateMitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(updateMitraDataError(error.message));
    }
}

function* workerSagaDeleteMitraData(action: any) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.delete, `http://localhost:3001/datamitra/${action.data}`, null, headers);

        if (response.status === 200) {
            yield put(deleteMitraDataSuccess(response.data))
        } else {
            yield put(deleteMitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(deleteMitraDataError(error.message));
    }    
    
}

function* workerSagaSearchMitraData(action: MitraDataAction) {
    try {
        const keywords = action.data
        const response = yield call(HttpService.get, `http://localhost:3001/datamitra?q=${keywords}`, {});
        
        if (response.status === 200) {
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
    takeLatest(ADD_MITRA, workerSagaAddMitraData),
    takeLatest(ADD_MITRA_SUCCESS, workerSagaMitraData),
    takeLatest(UPDATE_MITRA, workerSagaUpdateMitraData),
    takeLatest(UPDATE_MITRA_SUCCESS, workerSagaMitraData),
    takeLatest(DELETE_MITRA, workerSagaDeleteMitraData),
    takeLatest(DELETE_MITRA_SUCCESS, workerSagaMitraData),
    takeLatest(SEARCH_MITRA, workerSagaSearchMitraData),
    takeLatest(RESET_SEARCH_MITRA, workerSagaMitraData),
];
  