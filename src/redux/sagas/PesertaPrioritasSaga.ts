import {
	put,
	takeLatest,
	call,
} from 'redux-saga/effects';
import { 
	pesertaPrioritasSuccess,
	pesertaPrioritasError,
	exportCSVPesertaPrioritasSuccess,
	exportCSVPesertaPrioritasError,
	exportExcelPesertaPrioritasSuccess,
	exportExcelPesertaPrioritasError,
	searchAdvPesertaPrioritas,
} from '../actions/PesertaPrioritasAction';
import { 
	GET_PESERTA_PRIORITAS,
	SEARCH_PESERTA_PRIORITAS,
	SEARCH_ADV_PESERTA_PRIORITAS,
	RESET_SEARCH_PESERTA_PRIORITAS,
	EXPORTCSV_PESERTA_PRIORITAS,
	EXPORTEXCEL_PESERTA_PRIORITAS,
} from '../constants/PesertaPrioritasConstants';
import { PesertaPrioritasAction } from '../../interfaces/PesertaPrioritas';
import { HttpService } from '../../helpers/HttpService';
import FileDownload from 'js-file-download';
import { isNullOrUndefined } from 'util';

function* workerSagaPesertaPrioritas() {
	try {
		const response = yield call(HttpService.get, `/api/prioritas`, {});
		if (response.status === 200) {
			yield put(pesertaPrioritasSuccess(response.data));
		} else {
			yield put(pesertaPrioritasError(response.statusText));
		}
	} catch (error) {
		yield put(pesertaPrioritasError(error));
	}
}

function* workerSagaSearchPesertaPrioritas(action: PesertaPrioritasAction) {
	console.log("worker saga search peserta Prioritas summoned");
	try {
		const response = yield call(HttpService.get, `/api/prioritas?q=${action.data}`, {});
		if (response.status === 200) {
			yield put(pesertaPrioritasSuccess(response.data));
		} else {
			yield put(pesertaPrioritasError(response.statusText));
		}
	} catch (error) {
		yield put(pesertaPrioritasError(error));
	}
}

function* workerSagaSearchAdvPesertaPrioritas(action: PesertaPrioritasAction) {
	try {
		let paramQuery = "";
		paramQuery += ("namaPeserta=" + (isNullOrUndefined(action.data.namaPesertaFilter) ? "" : action.data.namaPesertaFilter));
		paramQuery += ("&noPeserta=" + (isNullOrUndefined(action.data.noPesertaFilter) ? "" : action.data.noPesertaFilter));
		paramQuery += ("&pemberiKerja=" + (isNullOrUndefined(action.data.pemberiKerjaFilter) ? "" : action.data.pemberiKerjaFilter));
		paramQuery += ("&noPonsel=" + (isNullOrUndefined(action.data.noPonselFilter) ? "" : action.data.noPonselFilter));
		paramQuery += ("&alamat=" + (isNullOrUndefined(action.data.alamatFilter) ? "" : action.data.alamatFilter));
		paramQuery += ("&skor=" + (isNullOrUndefined(action.data.skorFilter) ? "" : action.data.skorFilter));

		const response = yield call(HttpService.get, `/api/prioritas?${paramQuery}`)
		if (response.status === 200) {
			yield put(pesertaPrioritasSuccess(response.data));
		} else {
			yield put(pesertaPrioritasError(response.statusText));
		}
	} catch (error) {
		yield put(pesertaPrioritasError(error));
	}
}

function* workerSagaExportCSV() {
	const requestOption = {
        'responseType': 'arraybuffer'
	}
	try {
		const response = yield call(HttpService.get, `/api/prioritas/export/csv`, null, requestOption);
		FileDownload(response.data, 'peserta_prioritas.csv');
		if (response.status === 200 ) {
			yield put(exportCSVPesertaPrioritasSuccess(response.status));
		} else {
			yield put(exportCSVPesertaPrioritasError(response.statusText));
		}
	} catch (error) {
		yield put(exportCSVPesertaPrioritasError(error));
	}
}

function* workerSagaExportExcel() {
	const requestOption = {
        'responseType': 'arraybuffer'
	}
	try {
		const response = yield call(HttpService.get, `/api/prioritas/export/excel`, null, requestOption);
		FileDownload(response.data, 'peserta_prioritas.xlsx');
		if (response.status === 200 ) {
			yield put(exportExcelPesertaPrioritasSuccess(response.status));
		} else {
			yield put(exportExcelPesertaPrioritasError(response.statusText));
		}
	} catch (error) {
		yield put(exportExcelPesertaPrioritasError(error));
	}
}

export const watcherPesertaPrioritas = [
	takeLatest(GET_PESERTA_PRIORITAS, workerSagaPesertaPrioritas),
	takeLatest(SEARCH_PESERTA_PRIORITAS, workerSagaSearchPesertaPrioritas),
	takeLatest(SEARCH_ADV_PESERTA_PRIORITAS, workerSagaSearchAdvPesertaPrioritas),
	takeLatest(RESET_SEARCH_PESERTA_PRIORITAS, workerSagaPesertaPrioritas),
	takeLatest(EXPORTEXCEL_PESERTA_PRIORITAS, workerSagaExportExcel),
	takeLatest(EXPORTCSV_PESERTA_PRIORITAS, workerSagaExportCSV),
];