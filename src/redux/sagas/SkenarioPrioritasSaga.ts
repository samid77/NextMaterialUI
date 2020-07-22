import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { SkenarioPrioritasAction } from '../../interfaces/SkenarioPrioritas';
import { 
    skenarioPrioritasSuccess, 
    skenarioPrioritasError, 
    addSkenarioPrioritasSuccess, 
    addSkenarioPrioritasError,
    updateSkenarioPrioritasSuccess, 
    updateSkenarioPrioritasError,
    deleteSkenarioPrioritasSuccess, 
    deleteSkenarioPrioritasError,
    exportCSVSkenarioPrioritasSuccess, 
    exportCSVSkenarioPrioritasError,
    exportExcelSkenarioPrioritasSuccess, 
    exportExcelSkenarioPrioritasError,
} from '../actions/SkenarioPrioritasAction';
import { 
    GET_SKENARIOPRIORITAS, 
    ADD_SKENARIOPRIORITAS, 
    ADD_SKENARIOPRIORITAS_SUCCESS, 
    UPDATE_SKENARIOPRIORITAS, 
    UPDATE_SKENARIOPRIORITAS_SUCCESS, 
    DELETE_SKENARIOPRIORITAS,
    DELETE_SKENARIOPRIORITAS_SUCCESS,
    SEARCH_SKENARIOPRIORITAS,
    SEARCH_ADV_SKENARIOPRIORITAS,
    RESET_SEARCH_SKENARIOPRIORITAS,
    EXPORTCSV_SKENARIOPRIORITAS,
    EXPORTEXCEL_SKENARIOPRIORITAS
} from '../constants/SkenarioPrioritasConstants';
import { HttpService } from '../../helpers/HttpService';
import FileDownload from 'js-file-download';
  
function* workerSagaSkenarioPrioritas(action: SkenarioPrioritasAction) {
    try {
        const response = yield call(HttpService.get, `/api/skenario-prioritas?size=${25}`, {});
        
        if (response.status === 200) {
            yield put(skenarioPrioritasSuccess(response.data));
        } else {
            yield put(skenarioPrioritasError(response.statusText));
        }
    } catch (error) {
        yield put(skenarioPrioritasError(error));
    }
}

function* workerSagaAddSkenarioPrioritas(action: SkenarioPrioritasAction) {
    try {
        const data: object = {
            namaSkenario: action.data.namaSkenario,
            kriteria1: action.data.kriteria1,
            kriteria2: action.data.kriteria2,
            kriteria3: action.data.kriteria3,
            kriteria4: action.data.kriteria4,
            kriteria5: action.data.kriteria5,
            berlakuDari: action.data.berlakuDari,
            berlakuSampai: action.data.berlakuSampai
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.post, '/api/skenario-prioritas', data, headers);

        if (response.status === 200) {
            yield put(addSkenarioPrioritasSuccess(response.status))
        } else {
            yield put(addSkenarioPrioritasError(response.statusText));
        }
    } catch (error) {
        yield put(addSkenarioPrioritasError(error));
    }
}

function* workerSagaUpdateSkenarioPrioritas(action: SkenarioPrioritasAction) {
    try {
        const data: any = {
            id: action.data.id,
            namaSkenario: action.data.namaSkenario,
            kriteria1: action.data.kriteria1,
            kriteria2: action.data.kriteria2,
            kriteria3: action.data.kriteria3,
            kriteria4: action.data.kriteria4,
            kriteria5: action.data.kriteria5,
            berlakuDari: action.data.berlakuDari,
            berlakuSampai: action.data.berlakuSampai
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.put, `/api/skenario-prioritas/${data.id}`, data, headers);

        if (response.status === 200) {
            yield put(updateSkenarioPrioritasSuccess(response.data))
        } else {
            yield put(updateSkenarioPrioritasError(response.statusText));
        }
    } catch (error) {
        yield put(updateSkenarioPrioritasError(error));
    }
}

function* workerSagaDeleteSkenarioPrioritas(action: any) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.delete, `/api/skenario-prioritas/${action.data}`, null, headers);

        if (response.status === 200) {
            yield put(deleteSkenarioPrioritasSuccess(response.status))
        } else {
            yield put(deleteSkenarioPrioritasError(response.statusText));
        }
    } catch (error) {
        yield put(deleteSkenarioPrioritasError(error));
    }    
    
}

function* workerSagaSearchSkenarioPrioritas(action: SkenarioPrioritasAction) {
    try {
        const keywords = action.data
        const response = yield call(HttpService.get, `/api/skenario-prioritas?q=${keywords}`, {});
        
        if (response.status === 200) {
            yield put(skenarioPrioritasSuccess(response.data));
        } else {
            yield put(skenarioPrioritasError(response.statusText));
        }
    } catch (error) {
        yield put(skenarioPrioritasError(error));
    }
}

function* workerSagaSearchAdvSkenarioPrioritas(action: SkenarioPrioritasAction) {
    try {
        const params = action.data;
        const data: any = {
            namaSkenario: params.namaSkenariofilter,
            kriteria1: params.kriteria1filter,
            kriteria2: params.kriteria2filter,
            kriteria3: params.kriteria3filter,
            kriteria4: params.kriteria4filter,
            kriteria5: params.kriteria5filter,
            berlakuSampai: params.berlakuSampaifilter
        }
        const response = yield call(HttpService.get, `/api/skenario-prioritas?nama_skenario=${data.namaSkenario}&kriteria1=${data.kriteria1}&kriteria2=${data.kriteria2}&kriteria3=${data.kriteria3}&kriteria4=${data.kriteria4}&kriteria5=${data.kriteria5}&tanggal_berlaku=${data.berlakuSampai}`, {});
        
        if (response.status === 200) {
            yield put(skenarioPrioritasSuccess(response.data));
        } else {
            yield put(skenarioPrioritasError(response.statusText));
        }
    } catch (error) {
        console.log(`err saga: ${JSON.stringify(error)}`);
        yield put(skenarioPrioritasError(error));
    }
}

function* workerSagaExportCSV(action: SkenarioPrioritasAction) {
    const requestOption = {
        'responseType': 'arraybuffer'
    }
    try {
        const response = yield call(HttpService.get, `/api/skenario-prioritas/export/csv`, null, requestOption);
        FileDownload(response.data, 'skenario_prioritas_report.csv');
        if (response.status === 200) {
            yield put(exportCSVSkenarioPrioritasSuccess(response.status))
        } else {
            yield put(exportCSVSkenarioPrioritasError(response.statusText));
        }
    } catch (error) {
        yield put(exportCSVSkenarioPrioritasError(error));
    }
}

function* workerSagaExportExcel(action: SkenarioPrioritasAction) {
    const requestOption = {
        'responseType': 'arraybuffer'
    }
    try {
        const response = yield call(HttpService.get, `/api/skenario-prioritas/export/excel`, null, requestOption);
        FileDownload(response.data, 'skenario_prioritas.xlsx');
        if (response.status === 200) {
            yield put(exportExcelSkenarioPrioritasSuccess(response.status))
        } else {
            yield put(exportExcelSkenarioPrioritasError(response.statusText));
        }
    } catch (error) {
        yield put(exportExcelSkenarioPrioritasError(error));
    }
}


export const watcherSkenarioPrioritas = [
    takeLatest(GET_SKENARIOPRIORITAS, workerSagaSkenarioPrioritas),
    takeLatest(ADD_SKENARIOPRIORITAS, workerSagaAddSkenarioPrioritas),
    takeLatest(ADD_SKENARIOPRIORITAS_SUCCESS, workerSagaSkenarioPrioritas),
    takeLatest(UPDATE_SKENARIOPRIORITAS, workerSagaUpdateSkenarioPrioritas),
    takeLatest(UPDATE_SKENARIOPRIORITAS_SUCCESS, workerSagaSkenarioPrioritas),
    takeLatest(DELETE_SKENARIOPRIORITAS, workerSagaDeleteSkenarioPrioritas),
    takeLatest(DELETE_SKENARIOPRIORITAS_SUCCESS, workerSagaSkenarioPrioritas),
    takeLatest(SEARCH_SKENARIOPRIORITAS, workerSagaSearchSkenarioPrioritas),
    takeLatest(SEARCH_ADV_SKENARIOPRIORITAS, workerSagaSearchAdvSkenarioPrioritas),
    takeLatest(RESET_SEARCH_SKENARIOPRIORITAS, workerSagaSkenarioPrioritas),
    takeLatest(EXPORTCSV_SKENARIOPRIORITAS, workerSagaExportCSV),
    takeLatest(EXPORTEXCEL_SKENARIOPRIORITAS, workerSagaExportExcel)
];
  