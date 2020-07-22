import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { SkenarioKuotaAction } from '../../interfaces/SkenarioKuota';
import { 
    skenarioKuotaSuccess, 
    skenarioKuotaError, 
    addSkenarioKuotaSuccess, 
    addSkenarioKuotaError,
    updateSkenarioKuotaSuccess, 
    updateSkenarioKuotaError,
    deleteSkenarioKuotaSuccess, 
    deleteSkenarioKuotaError,
    exportCSVSkenarioKuotaSuccess, 
    exportCSVSkenarioKuotaError,
    exportExcelSkenarioKuotaSuccess, 
    exportExcelSkenarioKuotaError,
} from '../actions/SkenarioKuotaAction';
import { 
    GET_SKENARIOKUOTA, 
    ADD_SKENARIOKUOTA, 
    ADD_SKENARIOKUOTA_SUCCESS, 
    UPDATE_SKENARIOKUOTA, 
    UPDATE_SKENARIOKUOTA_SUCCESS, 
    DELETE_SKENARIOKUOTA,
    DELETE_SKENARIOKUOTA_SUCCESS,
    SEARCH_SKENARIOKUOTA,
    SEARCH_ADV_SKENARIOKUOTA,
    RESET_SEARCH_SKENARIOKUOTA,
    EXPORTCSV_SKENARIOKUOTA,
    EXPORTEXCEL_SKENARIOKUOTA
} from '../constants/SkenarioKuotaConstants';
import { HttpService } from '../../helpers/HttpService';
import FileDownload from 'js-file-download';
  
function* workerSagaSkenarioKuota(action: SkenarioKuotaAction) {
    try {
        const response = yield call(HttpService.get, `/api/skenario-kuota?size=${25}`, {});
        
        if (response.status === 200) {
            yield put(skenarioKuotaSuccess(response.data));
        } else {
            yield put(skenarioKuotaError(response.statusText));
        }
    } catch (error) {
        yield put(skenarioKuotaError(error));
    }
}

function* workerSagaAddSkenarioKuota(action: SkenarioKuotaAction) {
    try {
        const data: object = {
            namaSkenario: action.data.namaSkenario,
            kuota: action.data.kuota,
            berlakuDari: action.data.berlakuDari,
            berlakuSampai: action.data.berlakuSampai
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.post, '/api/skenario-kuota/create', data, headers);

        if (response.status === 200) {
            yield put(addSkenarioKuotaSuccess(response.status))
        } else {
            yield put(addSkenarioKuotaError(response.statusText));
        }
    } catch (error) {
        yield put(addSkenarioKuotaError(error));
    }
}

function* workerSagaUpdateSkenarioKuota(action: SkenarioKuotaAction) {
    try {
        const data: any = {
            namaSkenario: action.data.namaSkenario,
            kuota: action.data.kuota,
            berlakuDari: action.data.berlakuDari,
            berlakuSampai: action.data.berlakuSampai
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.put, `/api/skenario-kuota/${action.data.id}`, data, headers);

        if (response.status === 200) {
            yield put(updateSkenarioKuotaSuccess(response.data))
        } else {
            yield put(updateSkenarioKuotaError(response.statusText));
        }
    } catch (error) {
        yield put(updateSkenarioKuotaError(error));
    }
}

function* workerSagaDeleteSkenarioKuota(action: any) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.delete, `/api/skenario-kuota/${action.data}`, null, headers);

        if (response.status === 200) {
            yield put(deleteSkenarioKuotaSuccess(response.status))
        } else {
            yield put(deleteSkenarioKuotaError(response.statusText));
        }
    } catch (error) {
        yield put(deleteSkenarioKuotaError(error));
    }    
    
}

function* workerSagaSearchSkenarioKuota(action: SkenarioKuotaAction) {
    try {
        const keywords = action.data
        const response = yield call(HttpService.get, `/api/skenario-kuota?q=${keywords}`, {});
        
        if (response.status === 200) {
            yield put(skenarioKuotaSuccess(response.data));
        } else {
            yield put(skenarioKuotaError(response.statusText));
        }
    } catch (error) {
        yield put(skenarioKuotaError(error));
    }
}

function* workerSagaSearchAdvSkenarioKuota(action: SkenarioKuotaAction) {
    try {
        const data: any = {
            namaSkenario: action.data.namaSkenariofilter,
            tanggalBerlaku: action.data.berlakuSampaifilter
        }
        const response = yield call(HttpService.get, `/api/skenario-kuota?namaSkenario=${data.namaSkenario}&tanggalBerlaku=${data.tanggalBerlaku}`, {});
        
        if (response.status === 200) {
            yield put(skenarioKuotaSuccess(response.data));
        } else {
            yield put(skenarioKuotaError(response.statusText));
        }
    } catch (error) {
        yield put(skenarioKuotaError(error));
    }
}

function* workerSagaExportCSV(action: SkenarioKuotaAction) {
    const requestOption = {
        'responseType': 'arraybuffer'
    }
    try {
        const response = yield call(HttpService.get, `/api/skenario-kuota/export/csv`, null, requestOption);
        FileDownload(response.data, 'skenariokuota_report.csv');
        if (response.status === 200) {
            yield put(exportCSVSkenarioKuotaSuccess(response.status))
        } else {
            yield put(exportCSVSkenarioKuotaError(response.statusText));
        }
    } catch (error) {
        yield put(exportCSVSkenarioKuotaError(error));
    }
}

function* workerSagaExportExcel(action: SkenarioKuotaAction) {
    const requestOption = {
        'responseType': 'arraybuffer'
    }
    try {
        const response = yield call(HttpService.get, `/api/skenario-kuota/export/excel`, null, requestOption);
        FileDownload(response.data, 'skenariokuota.xlsx');
        if (response.status === 200) {
            yield put(exportExcelSkenarioKuotaSuccess(response.status))
        } else {
            yield put(exportExcelSkenarioKuotaError(response.statusText));
        }
    } catch (error) {
        yield put(exportExcelSkenarioKuotaError(error));
    }
}


export const watcherSkenarioKuota = [
    takeLatest(GET_SKENARIOKUOTA, workerSagaSkenarioKuota),
    takeLatest(ADD_SKENARIOKUOTA, workerSagaAddSkenarioKuota),
    takeLatest(ADD_SKENARIOKUOTA_SUCCESS, workerSagaSkenarioKuota),
    takeLatest(UPDATE_SKENARIOKUOTA, workerSagaUpdateSkenarioKuota),
    takeLatest(UPDATE_SKENARIOKUOTA_SUCCESS, workerSagaSkenarioKuota),
    takeLatest(DELETE_SKENARIOKUOTA, workerSagaDeleteSkenarioKuota),
    takeLatest(DELETE_SKENARIOKUOTA_SUCCESS, workerSagaSkenarioKuota),
    takeLatest(SEARCH_SKENARIOKUOTA, workerSagaSearchSkenarioKuota),
    takeLatest(SEARCH_ADV_SKENARIOKUOTA, workerSagaSearchAdvSkenarioKuota),
    takeLatest(RESET_SEARCH_SKENARIOKUOTA, workerSagaSkenarioKuota),
    takeLatest(EXPORTCSV_SKENARIOKUOTA, workerSagaExportCSV),
    takeLatest(EXPORTEXCEL_SKENARIOKUOTA, workerSagaExportExcel)
];
  