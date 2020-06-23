import {
    INDEX_PAGE,
    INDEX_PAGE_SUCCESS,
    INDEX_PAGE_ERROR,
    ANOTHER_PAGE,
    ANOTHER_PAGE_SUCCESS,
    ANOTHER_PAGE_ERROR,
} from '../constants/LayoutConstants';
import { LayoutAction, LayoutState } from '../../interfaces/Layout';

const initialState: LayoutState = {
    fetch: false,
    error: null,
    response: undefined,
    action: '',
    indexPage: true,
    anotherPage: false,
}

const LayoutReducers = (state: LayoutState = initialState, action: LayoutAction): LayoutState => {
    switch (action.type) {
        case INDEX_PAGE:
            return {
                ...state,
                fetch: true,
                action: action.type,
            };
        case INDEX_PAGE_SUCCESS:
            return {
                ...state,
                fetch: true,
                action: action.type,
                indexPage: action.data,
                anotherPage: false
            };
        case INDEX_PAGE_ERROR:
            return {
                ...state,
                fetch: true,
                action: action.type,
            };
        case ANOTHER_PAGE:
            return {
                ...state,
                fetch: true,
                action: action.type,
            };
        case ANOTHER_PAGE_SUCCESS:
            return {
                ...state,
                fetch: true,
                action: action.type,
                anotherPage: action.data,
                indexPage: false
            };
        case ANOTHER_PAGE_ERROR:
            return {
                ...state,
                fetch: true,
                action: action.type,
                indexPage: true,
                anotherPage: false
            };
        default:
            return state;
    }
}

export default LayoutReducers;