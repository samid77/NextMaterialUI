import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { ProdukDataAction } from '../../interfaces/ProdukData';
import { 
    getProdukData, 
    produkDataSuccess, 
    produkDataError, 
    addProdukDataSuccess, 
    addProdukDataError,
    updateProdukDataSuccess, 
    updateProdukDataError,
    deleteProdukDataSuccess, 
    deleteProdukDataError,
    searchProdukData,
    searchProdukDataSuccess, 
    searchProdukDataError,
    resetSearchProdukData
} from '../actions/ProdukDataAction';
import { 
    GET_PRODUK, 
    ADD_PRODUK, 
    ADD_PRODUK_SUCCESS, 
    UPDATE_PRODUK, 
    UPDATE_PRODUK_SUCCESS, 
    DELETE_PRODUK,
    DELETE_PRODUK_SUCCESS,
    SEARCH_PRODUK,
    SEARCH_PRODUK_SUCCESS,
    RESET_SEARCH_PRODUK
} from '../constants/ProdukConstants';
import Axios from 'axios';
import { HttpService } from '../../helpers/HttpService';
  
function* workerSagaProdukData(action: ProdukDataAction) {
    try {
        const data = {
            ...action.data
        };

        const response = yield call(HttpService.get, 'http://localhost:3001/dataproduk', {});
        
        if (response.status === 200) {
            yield put(produkDataSuccess(response.data));
        } else {
            yield put(produkDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error.message));
    }
}

function* workerSagaAddProdukData(action: ProdukDataAction) {
    try {
        const data: object = {
            idFiturProduk:'P003',
            namaFiturProduk: action.data.namaFiturProduk,
            idTipeProduk:'TP0002',
            namaTipeproduk: action.data.namaTipeproduk,
            namaSegmen: action.data.namaSegmen,
            penghasilanDari: action.data.penghasilanDari,
            penghasilanSampai: action.data.penghasilanSampai,
            plafon: action.data.plafon,
            sukubunga: action.data.sukubunga,
            tenor: action.data.tenor,
            idStatusPersetujuan: 1,
            statusPersetujuan: action.data.statusPersetujuan,
            created_at: new Date(),
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.post, 'http://localhost:3001/dataproduk', data, headers);

        if (response.status === 201) {
            yield put(addProdukDataSuccess(response.data))
        } else {
            yield put(addProdukDataError(response.statusText));
        }
    } catch (error) {
        yield put(addProdukDataError(error.message));
    }
}

function* workerSagaUpdateProdukData(action: ProdukDataAction) {
    try {
        const data: any = {
            id: action.data.id,
            idFiturProduk:action.data.idFiturProduk,
            namaFiturProduk: action.data.namaFiturProduk,
            idTipeProduk:action.data.idTipeProduk,
            namaTipeproduk: action.data.namaTipeproduk,
            namaSegmen: action.data.namaSegmen,
            penghasilanDari: action.data.penghasilanDari,
            penghasilanSampai: action.data.penghasilanSampai,
            plafon: action.data.plafon,
            sukubunga: action.data.sukubunga,
            tenor: action.data.tenor,
            idStatusPersetujuan: 1,
            statusPersetujuan: action.data.statusPersetujuan,
            created_at: new Date(),
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.put, `http://localhost:3001/dataproduk/${data.id}`, data, headers);

        if (response.status === 200) {
            yield put(updateProdukDataSuccess(response.data))
        } else {
            yield put(updateProdukDataError(response.statusText));
        }
    } catch (error) {
        yield put(updateProdukDataError(error.message));
    }
}

function* workerSagaDeleteProdukData(action: any) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.delete, `http://localhost:3001/dataproduk/${action.data}`, null, headers);

        if (response.status === 200) {
            yield put(deleteProdukDataSuccess(response.data))
        } else {
            yield put(deleteProdukDataError(response.statusText));
        }
    } catch (error) {
        yield put(deleteProdukDataError(error.message));
    }    
    
}

function* workerSagaSearchProdukData(action: ProdukDataAction) {
    try {
        const keywords = action.data
        console.log(`keywords in saga: ${keywords}`)

        const response = yield call(HttpService.get, `http://localhost:3001/dataproduk?q=${keywords}`, {});
        
        if (response.status === 200) {
            console.log(`results: ${response.data}`)
            yield put(produkDataSuccess(response.data));
        } else {
            yield put(produkDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error.message));
    }
}


export const watcherProdukData = [
    takeLatest(GET_PRODUK, workerSagaProdukData),
    takeLatest(ADD_PRODUK, workerSagaAddProdukData),
    takeLatest(ADD_PRODUK_SUCCESS, workerSagaProdukData),
    takeLatest(UPDATE_PRODUK, workerSagaUpdateProdukData),
    takeLatest(UPDATE_PRODUK_SUCCESS, workerSagaProdukData),
    takeLatest(DELETE_PRODUK, workerSagaDeleteProdukData),
    takeLatest(DELETE_PRODUK_SUCCESS, workerSagaProdukData),
    takeLatest(SEARCH_PRODUK, workerSagaSearchProdukData),
    takeLatest(RESET_SEARCH_PRODUK, workerSagaProdukData),
];
  