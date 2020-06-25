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
    case SEARCH_PRODUK:
    case RESET_SEARCH_PRODUK:
        return {
            ...state,
            fetch: true,
            action: action.type,
        };
    case PRODUK_SUCCESS:
    case SEARCH_PRODUK_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            data: action.data
        };
    case PRODUK_ERROR:
    case ADD_PRODUK_ERROR:
    case UPDATE_PRODUK_ERROR:
    case DELETE_PRODUK_ERROR:
    case SEARCH_PRODUK_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case ADD_PRODUK:
    case UPDATE_PRODUK:
    case DELETE_PRODUK:
        return {
            ...state,
            fetch: true,
            action: action.type,
            error: action.data
        };
    case ADD_PRODUK_SUCCESS:
    case UPDATE_PRODUK_SUCCESS:
    case DELETE_PRODUK_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
        };
    default:
      return state;
  }
}

export default ProdukDataReducers;
