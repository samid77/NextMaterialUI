import {
	put,
	takeLatest,
	call,
} from 'redux-saga/effects';
import { 
	pesertaEligibleSuccess,
	pesertaEligibleError,
	exportCSVPesertaEligibleSuccess,
	exportCSVPesertaEligibleError,
	exportExcelPesertaEligibleSuccess,
	exportExcelPesertaEligibleError,
	searchAdvPesertaEligible,
} from '../actions/PesertaEligibleAction';
import { 
	GET_PESERTA_ELIGIBLE,
	SEARCH_PESERTA_ELIGIBLE,
	SEARCH_ADV_PESERTA_ELIGIBLE,
	RESET_SEARCH_PESERTA_ELIGIBLE,
	EXPORTCSV_PESERTA_ELIGIBLE,
	EXPORTEXCEL_PESERTA_ELIGIBLE,
} from '../constants/PesertaEligibleConstants';
import { PesertaEligibleAction } from '../../interfaces/PesertaEligible';
import { HttpService } from '../../helpers/HttpService';
import FileDownload from 'js-file-download';
import { isNullOrUndefined } from 'util';

function* workerSagaPesertaEligible() {
	try {
		const response = yield call(HttpService.get, `/api/eligible`, {});
		if (response.status === 200) {
			yield put(pesertaEligibleSuccess(response.data));
		} else {
			yield put(pesertaEligibleError(response.statusText));
		}
	} catch (error) {
		yield put(pesertaEligibleError(error));
	}
}

function* workerSagaSearchPesertaEligible(action: PesertaEligibleAction) {
	try {
		const response = yield call(HttpService.get, `/api/eligible?q=${action.data}`, {});
		if (response.status === 200) {
			yield put(pesertaEligibleSuccess(response.data));
		} else {
			yield put(pesertaEligibleError(response.statusText));
		}
	} catch (error) {
		yield put(pesertaEligibleError(error));
	}
}

function* workerSagaSearchAdvPesertaEligible(action: PesertaEligibleAction) {
	try {
		let paramQuery = '';
		paramQuery += ('namaPeserta=' + (isNullOrUndefined(action.data.namaPesertaFilter) ? '' : action.data.namaPesertaFilter));
		paramQuery += ('&nomorPeserta=' + (isNullOrUndefined(action.data.nomorPesertaFilter) ? '' : action.data.nomorPesertaFilter));
		paramQuery += ('&pemberiKerja=' + (isNullOrUndefined(action.data.pemberiKerjaFilter) ? '' : action.data.pemberiKerjaFilter));
		paramQuery += ('&noPonsel=' + (isNullOrUndefined(action.data.nomorPonselFilter) ? '' : action.data.nomorPonselFilter));
		paramQuery += ('&alamat=' + (isNullOrUndefined(action.data.alamatFilter) ? '' : action.data.alamatFilter));

		const response = yield call(HttpService.get, `/api/eligible?${paramQuery}`)
		if (response.status === 200) {
			yield put(pesertaEligibleSuccess(response.data));
		} else {
			yield put(pesertaEligibleError(response.statusText));
		}
	} catch (error) {
		yield put(pesertaEligibleError(error));
	}
}

function* workerSagaExportCSV() {
	const requestOption = {
        'responseType': 'arraybuffer'
	}
	try {
		const response = yield call(HttpService.get, `/api/eligible/export/csv`, null, requestOption);
		FileDownload(response.data, 'peserta_eligible.csv');
		if (response.status === 200 ) {
			yield put(exportCSVPesertaEligibleSuccess(response.status));
		} else {
			yield put(exportCSVPesertaEligibleError(response.statusText));
		}
	} catch (error) {
		yield put(exportCSVPesertaEligibleError(error));
	}
}

function* workerSagaExportExcel() {
	const requestOption = {
        'responseType': 'arraybuffer'
	}
	try {
		const response = yield call(HttpService.get, `/api/eligible/export/excel`, null, requestOption);
		FileDownload(response.data, 'peserta_eligible.xlsx');
		if (response.status === 200 ) {
			yield put(exportExcelPesertaEligibleSuccess(response.status));
		} else {
			yield put(exportExcelPesertaEligibleError(response.statusText));
		}
	} catch (error) {
		yield put(exportExcelPesertaEligibleError(error));
	}
}

export const watcherPesertaEligible = [
	takeLatest(GET_PESERTA_ELIGIBLE, workerSagaPesertaEligible),
	takeLatest(SEARCH_PESERTA_ELIGIBLE, workerSagaSearchPesertaEligible),
	takeLatest(SEARCH_ADV_PESERTA_ELIGIBLE, workerSagaSearchAdvPesertaEligible),
	takeLatest(RESET_SEARCH_PESERTA_ELIGIBLE, workerSagaPesertaEligible),
	takeLatest(EXPORTEXCEL_PESERTA_ELIGIBLE, workerSagaExportExcel),
	takeLatest(EXPORTCSV_PESERTA_ELIGIBLE, workerSagaExportCSV),
];