import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { 
    isIndexPage,
    isIndexPageSuccess,
    isIndexPageError,
    isAnotherPage,
    isAnotherPageSuccess,
    isAnotherPageError,
} from '../actions/LayoutActions';

import { 
    INDEX_PAGE,
    INDEX_PAGE_SUCCESS,
    INDEX_PAGE_ERROR,
    ANOTHER_PAGE,
    ANOTHER_PAGE_SUCCESS,
    ANOTHER_PAGE_ERROR, 
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