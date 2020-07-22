import { 
    GET_PRODUK, 
    PRODUK_SUCCESS, 
    PRODUK_ERROR,
    GET_PRODUK_FITUR, 
    GET_PRODUK_FITUR_SUCCESS, 
    GET_PRODUK_FITUR_ERROR,
    GET_PRODUK_TIPE, 
    GET_PRODUK_TIPE_SUCCESS, 
    GET_PRODUK_TIPE_ERROR,
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
    SEARCH_ADV_PRODUK, 
    SEARCH_ADV_PRODUK_SUCCESS, 
    SEARCH_ADV_PRODUK_ERROR,
    EXPORTCSV_PRODUK,
    EXPORTCSV_PRODUK_SUCCESS, 
    EXPORTCSV_PRODUK_ERROR,
    EXPORTEXCEL_PRODUK,
    EXPORTEXCEL_PRODUK_SUCCESS, 
    EXPORTEXCEL_PRODUK_ERROR,
    RESET_SEARCH_PRODUK
} from '../constants/ProdukConstants';
import { ProdukDataListState, ProdukDataAction } from '../../interfaces/ProdukData';

const initialState: ProdukDataListState = {
    fetch: false,
    error: null,
    response: undefined,
    action: '',
    data: [],
    fiturProduk: [],
    tipeProduk: []
}

const ProdukDataReducers = (state: ProdukDataListState = initialState, action: ProdukDataAction): ProdukDataListState => {
  switch (action.type) {
    case GET_PRODUK:
    case GET_PRODUK_FITUR:
    case GET_PRODUK_TIPE:
    case SEARCH_PRODUK:
    case SEARCH_ADV_PRODUK:
    case RESET_SEARCH_PRODUK:
    case EXPORTCSV_PRODUK:
    case EXPORTEXCEL_PRODUK:
        return {
            ...state,
            fetch: true,
            action: action.type,
        };
    case PRODUK_SUCCESS:
    case SEARCH_PRODUK_SUCCESS:
    case SEARCH_ADV_PRODUK_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            data: action.data
        };
    case GET_PRODUK_FITUR_SUCCESS: 
        return {
            ...state,
            fetch: false,
            action: action.type,
            fiturProduk: action.fiturProduk
        }
    case GET_PRODUK_TIPE_SUCCESS: 
        return {
            ...state,
            fetch: false,
            action: action.type,
            tipeProduk: action.tipeProduk
        }
    case PRODUK_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data.status,
            error: action.data.data,
            data: []
        };
    case GET_PRODUK_FITUR_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data.status,
            error: action.data.data,
            fiturProduk: []
        };
    case GET_PRODUK_TIPE_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data.status,
            error: action.data.data,
            tipeProduk: []
        };
    case ADD_PRODUK_ERROR:
    case UPDATE_PRODUK_ERROR:
    case DELETE_PRODUK_ERROR:
    case SEARCH_PRODUK_ERROR:
    case SEARCH_ADV_PRODUK_ERROR:
    case EXPORTCSV_PRODUK_ERROR:
    case EXPORTEXCEL_PRODUK_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data.status,
            error: action.data.data
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
    case EXPORTCSV_PRODUK_SUCCESS:
    case EXPORTEXCEL_PRODUK_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data
        };
    default:
      return state;
  }
}

export default ProdukDataReducers;
