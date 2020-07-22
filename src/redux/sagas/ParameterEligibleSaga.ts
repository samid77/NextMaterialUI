import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { ParameterEligibleAction } from '../../interfaces/ParameterEligible';
import { 
    parameterEligibleSuccess, 
    parameterEligibleError, 
} from '../actions/ParameterEligibleAction';
import { 
    GET_PARAMETERELIGIBLE, 
} from '../constants/ParameterEligibleConstants';
import { HttpService } from '../../helpers/HttpService';

function* workerSagaParameterEligible(action: ParameterEligibleAction) {
    try {
        const response = yield call(HttpService.get, `/api/eligible/countpeserta`, {});
        if (response.status === 200) {
            yield put(parameterEligibleSuccess(response));
        } else {
            yield put(parameterEligibleError(response.statusText));
        }
    } catch (error) {
        yield put(parameterEligibleError(error));
    }
}

export const watcherParameterEligible = [
    takeLatest(GET_PARAMETERELIGIBLE, workerSagaParameterEligible)
]