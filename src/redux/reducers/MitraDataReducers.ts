import { 
    GET_MITRA, 
    MITRA_SUCCESS, 
    MITRA_ERROR,
    ADD_MITRA, 
    ADD_MITRA_SUCCESS, 
    ADD_MITRA_ERROR,
    UPDATE_MITRA, 
    UPDATE_MITRA_SUCCESS, 
    UPDATE_MITRA_ERROR,
    DELETE_MITRA, 
    DELETE_MITRA_SUCCESS, 
    DELETE_MITRA_ERROR,
    SEARCH_MITRA, 
    SEARCH_MITRA_SUCCESS, 
    SEARCH_MITRA_ERROR,
    RESET_SEARCH_MITRA
} from '../constants/MitraConstants';
import { MitraDataListState, MitraDataAction } from '../../interfaces/MitraData';

const initialState: MitraDataListState = {
    fetch: false,
    error: null,
    response: undefined,
    action: '',
    data: []
}

const MitraDataReducers = (state: MitraDataListState = initialState, action: MitraDataAction): MitraDataListState => {
  switch (action.type) {
    case GET_MITRA:
    case SEARCH_MITRA:
    case RESET_SEARCH_MITRA:
        return {
            ...state,
            fetch: true,
            action: action.type,
        };
    case MITRA_SUCCESS:
    case SEARCH_MITRA_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            data: action.data
        };
    case MITRA_ERROR:
    case ADD_MITRA_ERROR:
    case UPDATE_MITRA_ERROR:
    case DELETE_MITRA_ERROR:
    case SEARCH_MITRA_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case ADD_MITRA:
    case UPDATE_MITRA:
    case DELETE_MITRA:
        return {
            ...state,
            fetch: true,
            action: action.type,
            error: action.data
        };
    case ADD_MITRA_SUCCESS:
    case UPDATE_MITRA_SUCCESS:
    case DELETE_MITRA_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
        };
    default:
      return state;
  }
}

export default MitraDataReducers;
