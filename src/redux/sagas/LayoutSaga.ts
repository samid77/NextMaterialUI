import {
    put,
    takeLatest,
} from 'redux-saga/effects';
import { 
    isIndexPageSuccess,
    isAnotherPageSuccess,
} from '../actions/LayoutActions';

import { 
    INDEX_PAGE,
    ANOTHER_PAGE,
} from '../constants/LayoutConstants';

function* workerSagaIndexPage(action: any) {
    yield put(isIndexPageSuccess(true))
}

function* workerSagaAnotherPage(action: any) {
    yield put(isAnotherPageSuccess(true))
}

export const watcherLayout = [
    takeLatest(INDEX_PAGE, workerSagaIndexPage),
    takeLatest(ANOTHER_PAGE, workerSagaAnotherPage),
];