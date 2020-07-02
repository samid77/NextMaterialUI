import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { ProdukDataAction } from '../../interfaces/ProdukData';
import { 
    produkDataSuccess,
    produkDataError, 
    getProdukFiturDataSuccess, 
    getProdukFiturDataError,
    getProdukTipeDataSuccess, 
    getProdukTipeDataError,
    addProdukDataSuccess, 
    addProdukDataError,
    updateProdukDataSuccess, 
    updateProdukDataError,
    deleteProdukDataSuccess, 
    deleteProdukDataError
} from '../actions/ProdukDataAction';
import { 
    GET_PRODUK, 
    GET_PRODUK_FITUR,
    GET_PRODUK_TIPE,
    ADD_PRODUK, 
    ADD_PRODUK_SUCCESS, 
    UPDATE_PRODUK, 
    UPDATE_PRODUK_SUCCESS, 
    DELETE_PRODUK,
    DELETE_PRODUK_SUCCESS,
    SEARCH_PRODUK,
    RESET_SEARCH_PRODUK
} from '../constants/ProdukConstants';
import { HttpService } from '../../helpers/HttpService';
  
function* workerSagaProdukData(action: ProdukDataAction) {
    try {
        const response = yield call(HttpService.get, 'http://localhost:3000/api/master-data/produk', {});
        
        if (response.status === 200) {
            yield put(produkDataSuccess(response.data));
        } else {
            yield put(produkDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error.message));
    }
}

function* workerSagaGetProdukFiturData(action: ProdukDataAction) {
    try {
        const response = yield call(HttpService.get, 'http://localhost:3000/api/master-data/produk/fitur-produk', {});
        
        if (response.status === 200) {
            yield put(getProdukFiturDataSuccess(response.data));
        } else {
            yield put(getProdukFiturDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error.message));
    }
}

function* workerSagaGetProdukTipeData(action: ProdukDataAction) {
    try {
        const response = yield call(HttpService.get, 'http://localhost:3000/api/master-data/produk/tipe-produk', {});
        
        if (response.status === 200) {
            yield put(getProdukTipeDataSuccess(response.data));
        } else {
            yield put(getProdukTipeDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error.message));
    }
}

function* workerSagaAddProdukData(action: ProdukDataAction) {
    try {
        const data: object = {
            idFiturProduk: action.data.idFiturProduk,
            namaFiturProduk: action.data.namaFiturProduk,
            idTipeProduk:action.data.idTipeProduk,
            namaTipeProduk: action.data.namaTipeProduk,
            namaSegmen: action.data.namaSegmen,
            penghasilanDari: action.data.penghasilanDari,
            penghasilanSampai: action.data.penghasilanSampai,
            plafon: action.data.plafon,
            sukuBunga: action.data.sukuBunga,
            tenor: action.data.tenor
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.post, 'http://localhost:3000/api/master-data/produk', data, headers);

        if (response.status === 200) {
            yield put(addProdukDataSuccess(response.status))
        } else {
            yield put(addProdukDataError(response.statusText));
        }
    } catch (error) {
        yield put(addProdukDataError(error));
    }
}

function* workerSagaUpdateProdukData(action: ProdukDataAction) {
    try {
        const data: any = {
            id: action.data.id,
            idFiturProduk:action.data.idFiturProduk,
            namaFiturProduk: action.data.namaFiturProduk,
            idTipeProduk:action.data.idTipeProduk,
            namaTipeProduk: action.data.namaTipeProduk,
            namaSegmen: action.data.namaSegmen,
            penghasilanDari: action.data.penghasilanDari,
            penghasilanSampai: action.data.penghasilanSampai,
            plafon: action.data.plafon,
            sukuBunga: action.data.sukuBunga,
            tenor: action.data.tenor,
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.put, `http://localhost:3000/api/master-data/produk/${data.id}`, data, headers);

        if (response.status === 200) {
            yield put(updateProdukDataSuccess(response.data))
        } else {
            yield put(updateProdukDataError(response.statusText));
        }
    } catch (error) {
        yield put(updateProdukDataError(error));
    }
}

function* workerSagaDeleteProdukData(action: any) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.delete, `http://localhost:3000/api/master-data/produk/${action.data}`, null, headers);
        if (response.status === 200) {
            yield put(deleteProdukDataSuccess(response.status))
        } else {
            yield put(deleteProdukDataError(response.statusText));
        }
    } catch (error) {
        yield put(deleteProdukDataError(error));
    }    
    
}

function* workerSagaSearchProdukData(action: ProdukDataAction) {
    try {
        const keywords = action.data
        const response = yield call(HttpService.get, `http://localhost:3001/dataproduk?q=${keywords}`, {});
        
        if (response.status === 200) {
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
    takeLatest(GET_PRODUK_FITUR, workerSagaGetProdukFiturData),
    takeLatest(GET_PRODUK_TIPE, workerSagaGetProdukTipeData),
    takeLatest(ADD_PRODUK, workerSagaAddProdukData),
    takeLatest(ADD_PRODUK_SUCCESS, workerSagaProdukData),
    takeLatest(UPDATE_PRODUK, workerSagaUpdateProdukData),
    takeLatest(UPDATE_PRODUK_SUCCESS, workerSagaProdukData),
    takeLatest(DELETE_PRODUK, workerSagaDeleteProdukData),
    takeLatest(DELETE_PRODUK_SUCCESS, workerSagaProdukData),
    takeLatest(SEARCH_PRODUK, workerSagaSearchProdukData),
    takeLatest(RESET_SEARCH_PRODUK, workerSagaProdukData),
];
  