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
    DELETE_MITRA_ERROR
} from '../constants/MitraConstants';
import { MitraDataListState, MitraDataAction } from '../../interfaces/MitraData';

const initialState: MitraDataListState = {
    fetch: false,
    error: null,
    response: [],
    action: ''
}

const MitraDataReducers = (state: MitraDataListState = initialState, action: MitraDataAction): MitraDataListState => {
  switch (action.type) {
    case GET_MITRA:
        return {
            ...state,
            fetch: true,
            action: action.type,
        };
    case MITRA_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data
        };
    case MITRA_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case ADD_MITRA:
        return {
            ...state,
            fetch: true,
            action: action.type,
            error: action.data
        };
    case ADD_MITRA_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    case ADD_MITRA_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            error: action.data
        };
    default:
      return state;
  }
}

export default MitraDataReducers;
