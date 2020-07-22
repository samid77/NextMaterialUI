import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { MitraDataAction } from '../../interfaces/MitraData';
import { 
    mitraDataSuccess, 
    mitraDataError, 
    addMitraDataSuccess, 
    addMitraDataError,
    updateMitraDataSuccess, 
    updateMitraDataError,
    deleteMitraDataSuccess, 
    deleteMitraDataError,
    exportCSVMitraSuccess, 
    exportCSVMitraError,
    exportExcelMitraSuccess, 
    exportExcelMitraError,
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
    SEARCH_ADV_MITRA,
    RESET_SEARCH_MITRA,
    EXPORTCSV_MITRA,
    EXPORTEXCEL_MITRA
} from '../constants/MitraConstants';
import { HttpService } from '../../helpers/HttpService';
import FileDownload from 'js-file-download';
  
function* workerSagaMitraData(action: MitraDataAction) {
    try {
        const response = yield call(HttpService.get, `/api/master-data/mitra?size=${25}`, {});
        
        if (response.status === 200) {
            yield put(mitraDataSuccess(response.data));
        } else {
            yield put(mitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(mitraDataError(error));
    }
}

function* workerSagaAddMitraData(action: MitraDataAction) {
    try {
        const data: object = {
            namaMitra: action.data.namaMitra,
            tanggalMulaiPKS: action.data.tanggalMulaiPKS,
            tanggalAkhirPKS: action.data.tanggalAkhirPKS,
            tanggalMulaiLimit: action.data.tanggalMulaiLimit,
            tanggalAkhirLimit: action.data.tanggalAkhirLimit,
            targetUnit: action.data.targetUnit,
            maksimalLimit: action.data.maksimalLimit,
            targetNominal: action.data.targetNominal
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.post, '/api/master-data/mitra', data, headers);

        if (response.status === 200) {
            yield put(addMitraDataSuccess(response.status))
        } else {
            yield put(addMitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(addMitraDataError(error));
    }
}

function* workerSagaUpdateMitraData(action: MitraDataAction) {
    try {
        const data: any = {
            id: action.data.id,
            namaMitra: action.data.namaMitra,
            tanggalMulaiPKS: action.data.tanggalMulaiPKS,
            tanggalAkhirPKS: action.data.tanggalAkhirPKS,
            tanggalMulaiLimit: action.data.tanggalMulaiLimit,
            tanggalAkhirLimit: action.data.tanggalAkhirLimit,
            targetUnit: action.data.targetUnit,
            maksimalLimit: action.data.maksimalLimit,
            targetNominal: action.data.targetNominal,
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.put, `/api/master-data/mitra/${data.id}`, data, headers);

        if (response.status === 200) {
            yield put(updateMitraDataSuccess(response.data))
        } else {
            yield put(updateMitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(updateMitraDataError(error));
    }
}

function* workerSagaDeleteMitraData(action: any) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = yield call(HttpService.delete, `/api/master-data/mitra/${action.data}`, null, headers);

        if (response.status === 200) {
            yield put(deleteMitraDataSuccess(response.status))
        } else {
            yield put(deleteMitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(deleteMitraDataError(error));
    }    
    
}

function* workerSagaSearchMitraData(action: MitraDataAction) {
    try {
        const keywords = action.data
        const response = yield call(HttpService.get, `/api/master-data/mitra?q=${keywords}`, {});
        
        if (response.status === 200) {
            yield put(mitraDataSuccess(response.data));
        } else {
            yield put(mitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(mitraDataError(error));
    }
}

function* workerSagaSearchAdvMitraData(action: MitraDataAction) {
    try {
        const params = action.data;
        const data: any = {
            nama_mitra: action.data.namaMitrafilter,
            tanggal_mulai_pks: action.data.tanggalMulaiPKSfilter,
            tanggal_akhir_pks: action.data.tanggalAkhirPKSfilter,
            tanggal_mulai_limit: action.data.tanggalMulaiLimitfilter,
            tanggal_akhir_limit: action.data.tanggalAkhirLimitfilter,
            target_unit: action.data.targetUnitfilter,
            maksimal_limit: action.data.maksimalLimitfilter,
            target_nominal: action.data.targetNominalfilter,
        }
        const response = yield call(HttpService.get, `/api/master-data/mitra?nama_mitra=${data.nama_mitra === 'Semua Mitra' ? '' : data.nama_mitra}&tanggal_mulai_pks=${data.tanggal_mulai_pks}&tanggal_akhir_pks=${data.tanggal_akhir_pks}&tanggal_mulai_limit=${data.tanggal_mulai_limit}&tanggal_akhir_limit=${data.tanggal_akhir_limit}&target_unit=${isNaN(data.target_unit) ? '' : data.target_unit}&maksimal_limit=${isNaN(data.maksimal_limit) ? '' : data.maksimal_limit}&target_nominal=${isNaN(data.target_nominal) ? '' : data.target_nominal}`, {});
        
        if (response.status === 200) {
            yield put(mitraDataSuccess(response.data));
        } else {
            yield put(mitraDataError(response.statusText));
        }
    } catch (error) {
        yield put(mitraDataError(error));
    }
}

function* workerSagaExportCSV(action: MitraDataAction) {
    const requestOption = {
        'responseType': 'arraybuffer'
    }
    try {
        const response = yield call(HttpService.get, `/api/master-data/mitra/export/csv`, null, requestOption);
        FileDownload(response.data, 'mitra_report.csv');
        if (response.status === 200) {
            yield put(exportCSVMitraSuccess(response.status))
        } else {
            yield put(exportCSVMitraError(response.statusText));
        }
    } catch (error) {
        yield put(exportCSVMitraError(error));
    }
}

function* workerSagaExportExcel(action: MitraDataAction) {
    const requestOption = {
        'responseType': 'arraybuffer'
    }
    try {
        const response = yield call(HttpService.get, `/api/master-data/mitra/export/excel`, null, requestOption);
        FileDownload(response.data, 'master_data_mitra.xlsx');
        if (response.status === 200) {
            yield put(exportExcelMitraSuccess(response.status))
        } else {
            yield put(exportExcelMitraError(response.statusText));
        }
    } catch (error) {
        yield put(exportExcelMitraError(error));
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
    takeLatest(SEARCH_ADV_MITRA, workerSagaSearchAdvMitraData),
    takeLatest(RESET_SEARCH_MITRA, workerSagaMitraData),
    takeLatest(EXPORTCSV_MITRA, workerSagaExportCSV),
    takeLatest(EXPORTEXCEL_MITRA, workerSagaExportExcel)
];
  