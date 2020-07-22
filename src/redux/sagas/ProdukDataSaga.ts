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
    deleteProdukDataError,
    exportCSVProdukSuccess, 
    exportCSVProdukError,
    exportExcelProdukSuccess, 
    exportExcelProdukError,
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
    SEARCH_ADV_PRODUK,
    RESET_SEARCH_PRODUK,
    EXPORTCSV_PRODUK,
    EXPORTEXCEL_PRODUK
} from '../constants/ProdukConstants';
import { HttpService } from '../../helpers/HttpService';
import FileDownload from 'js-file-download';
import { isNullOrUndefined } from 'util';
  
function* workerSagaProdukData(action: ProdukDataAction) {
    try {
        const response = yield call(HttpService.get, '/api/master-data/produk', {});
        
        if (response.status === 200) {
            yield put(produkDataSuccess(response.data));
        } else {
            yield put(produkDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error));
    }
}

function* workerSagaGetProdukFiturData(action: ProdukDataAction) {
    try {
        const response = yield call(HttpService.get, '/api/master-data/produk/fitur-produk', {});
        
        if (response.status === 200) {
            yield put(getProdukFiturDataSuccess(response.data));
        } else {
            yield put(getProdukFiturDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error));
    }
}

function* workerSagaGetProdukTipeData(action: ProdukDataAction) {
    try {
        const response = yield call(HttpService.get, '/api/master-data/produk/tipe-produk', {});
        
        if (response.status === 200) {
            yield put(getProdukTipeDataSuccess(response.data));
        } else {
            yield put(getProdukTipeDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error));
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
        const response = yield call(HttpService.post, '/api/master-data/produk', data, headers);

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
        const response = yield call(HttpService.put, `/api/master-data/produk/${data.id}`, data, headers);

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
        const response = yield call(HttpService.delete, `/api/master-data/produk/${action.data}`, null, headers);
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
        const response = yield call(HttpService.get, `/api/master-data/produk?q=${keywords}`, {});
        
        if (response.status === 200) {
            yield put(produkDataSuccess(response.data));
        } else {
            yield put(produkDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error));
    }
}

function* workerSagaExportCSV(action: ProdukDataAction) {
    const requestOption = {
        'responseType': 'arraybuffer'
    }
    try {
        const response = yield call(HttpService.get, `/api/master-data/produk/export/csv`, null, requestOption);
        FileDownload(response.data, 'master_data_produk.csv');
        if (response.status === 200) {
            yield put(exportCSVProdukSuccess(response.status))
        } else {
            yield put(exportCSVProdukError(response.statusText));
        }
    } catch (error) {
        yield put(exportCSVProdukError(error));
    }
}

function* workerSagaExportExcel(action: ProdukDataAction) {
    const requestOption = {
        'responseType': 'arraybuffer'
    }
    try {
        const response = yield call(HttpService.get, `/api/master-data/produk/export/excel`, null, requestOption);
        FileDownload(response.data, 'master_data_produk.xlsx');
        if (response.status === 200) {
            yield put(exportExcelProdukSuccess(response.status))
        } else {
            yield put(exportExcelProdukError(response.statusText));
        }
    } catch (error) {
        yield put(exportExcelProdukError(error));
    }
}

function* workerSagaSearchAdvProdukData(action: ProdukDataAction) {
    try {
        const params = action.data;
        const data: any = {
            namaFiturProduk: action.data.namaFiturProdukfilter,
            namaTipeProduk: action.data.namaTipeProdukfilter,
            namaSegmen: action.data.namaSegmenfilter,
            penghasilanDari: action.data.penghasilanDarifilter,
            penghasilanSampai: action.data.penghasilanSampaifilter,
            plafon: action.data.plafonfilter,
            sukuBunga: action.data.sukuBungafilter,
            tenor: action.data.tenorfilter,
        }
        const response = yield call(HttpService.get, `/api/master-data/produk?namaFiturProduk=${data.namaFiturProduk === 'Semua Produk' ? '' : data.namaFiturProduk}&namaTipeProduk=${data.namaTipeProduk}&namaSegmen=${data.namaSegmen}&penghasilanDari=${data.penghasilanDari}&penghasilanSampai=${data.penghasilanSampai}&plafon=${isNaN(data.plafon) ? '' : data.plafon}&sukuBunga=${isNaN(data.sukuBunga) ? '' : data.sukuBunga}&tenor=${isNaN(data.tenor) ? '' : data.tenor}&penghasilanDariOpr=>=&penghasilanSampaiOpr=<=`, {});
        
        if (response.status === 200) {
            yield put(produkDataSuccess(response.data));
        } else {
            yield put(produkDataError(response.statusText));
        }
    } catch (error) {
        yield put(produkDataError(error));
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
    takeLatest(SEARCH_ADV_PRODUK, workerSagaSearchAdvProdukData),
    takeLatest(RESET_SEARCH_PRODUK, workerSagaProdukData),
    takeLatest(EXPORTCSV_PRODUK, workerSagaExportCSV),
    takeLatest(EXPORTEXCEL_PRODUK, workerSagaExportExcel)
];
  