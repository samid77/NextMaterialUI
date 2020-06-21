import { 
    GET_PRODUK, 
    PRODUK_SUCCESS, 
    PRODUK_ERROR,
    ADD_PRODUK, 
    ADD_PRODUK_SUCCESS, 
    ADD_PRODUK_ERROR,
    UPDATE_PRODUK, 
    UPDATE_PRODUK_SUCCESS, 
    UPDATE_PRODUK_ERROR,
    DELETE_PRODUK, 
    DELETE_PRODUK_SUCCESS, 
    DELETE_PRODUK_ERROR,
    SEARCH_PRODUK, 
    SEARCH_PRODUK_SUCCESS, 
    SEARCH_PRODUK_ERROR,
    RESET_SEARCH_PRODUK
} from '../constants/ProdukConstants';
import { ProdukDataListState, ProdukDataAction } from '../../interfaces/ProdukData';

const initialState: ProdukDataListState = {
    fetch: false,
    error: null,
    response: undefined,
    action: '',
    data: []
}

const ProdukDataReducers = (state: ProdukDataListState = initialState, action: ProdukDataAction): ProdukDataListState => {
  switch (action.type) {
    case GET_PRODUK:
        return {
            ...state,
            fetch: true,
            action: action.type,
        };
    case PRODUK_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            data: action.data
        };
    case PRODUK_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case ADD_PRODUK:
        return {
            ...state,
            fetch: true,
            action: action.type,
            error: action.data
        };
    case ADD_PRODUK_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case ADD_PRODUK_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case UPDATE_PRODUK:
        return {
            ...state,
            fetch: true,
            action: action.type,
            error: action.data
        };
    case UPDATE_PRODUK_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case UPDATE_PRODUK_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case DELETE_PRODUK:
        return {
            ...state,
            fetch: true,
            action: action.type,
            error: action.data
        };
    case DELETE_PRODUK_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case DELETE_PRODUK_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case SEARCH_PRODUK:
        return {
            ...state,
            fetch: true,
            action: action.type,
        };
    case SEARCH_PRODUK_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            data: action.data
        };
    case SEARCH_PRODUK_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case RESET_SEARCH_PRODUK:
        return {
            ...state,
            fetch: true,
            action: action.type,
        };
    default:
      return state;
  }
}

export default ProdukDataReducers;
