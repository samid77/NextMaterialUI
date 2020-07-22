import { 
    GET_SKENARIOPRIORITAS, 
    SKENARIOPRIORITAS_SUCCESS, 
    SKENARIOPRIORITAS_ERROR,
    ADD_SKENARIOPRIORITAS, 
    ADD_SKENARIOPRIORITAS_SUCCESS, 
    ADD_SKENARIOPRIORITAS_ERROR,
    UPDATE_SKENARIOPRIORITAS, 
    UPDATE_SKENARIOPRIORITAS_SUCCESS, 
    UPDATE_SKENARIOPRIORITAS_ERROR,
    DELETE_SKENARIOPRIORITAS, 
    DELETE_SKENARIOPRIORITAS_SUCCESS, 
    DELETE_SKENARIOPRIORITAS_ERROR,
    SEARCH_SKENARIOPRIORITAS, 
    SEARCH_SKENARIOPRIORITAS_SUCCESS, 
    SEARCH_SKENARIOPRIORITAS_ERROR,
    SEARCH_ADV_SKENARIOPRIORITAS, 
    SEARCH_ADV_SKENARIOPRIORITAS_SUCCESS, 
    SEARCH_ADV_SKENARIOPRIORITAS_ERROR,
    EXPORTCSV_SKENARIOPRIORITAS,
    EXPORTCSV_SKENARIOPRIORITAS_SUCCESS, 
    EXPORTCSV_SKENARIOPRIORITAS_ERROR,
    EXPORTEXCEL_SKENARIOPRIORITAS,
    EXPORTEXCEL_SKENARIOPRIORITAS_SUCCESS, 
    EXPORTEXCEL_SKENARIOPRIORITAS_ERROR,
    RESET_SEARCH_SKENARIOPRIORITAS
} from '../constants/SkenarioPrioritasConstants';
import { SkenarioPrioritasListState, SkenarioPrioritasAction } from '../../interfaces/SkenarioPrioritas';

const initialState: SkenarioPrioritasListState = {
    fetch: false,
    error: null,
    response: undefined,
    action: '',
    data: []
}

const SkenarioPrioritasReducers = (state: SkenarioPrioritasListState = initialState, action: SkenarioPrioritasAction): SkenarioPrioritasListState => {
  switch (action.type) {
    case GET_SKENARIOPRIORITAS:
    case SEARCH_SKENARIOPRIORITAS:
    case SEARCH_ADV_SKENARIOPRIORITAS:
    case RESET_SEARCH_SKENARIOPRIORITAS:
    case EXPORTCSV_SKENARIOPRIORITAS:
    case EXPORTEXCEL_SKENARIOPRIORITAS:
        return {
            ...state,
            fetch: true,
            action: action.type,
        };
    case SKENARIOPRIORITAS_SUCCESS:
    case SEARCH_SKENARIOPRIORITAS_SUCCESS:
    case SEARCH_ADV_SKENARIOPRIORITAS_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            data: action.data
        };
    case SKENARIOPRIORITAS_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data.status,
            error: action.data.data,
            data: []
        };
    case ADD_SKENARIOPRIORITAS_ERROR:
    case UPDATE_SKENARIOPRIORITAS_ERROR:
    case DELETE_SKENARIOPRIORITAS_ERROR:
    case SEARCH_SKENARIOPRIORITAS_ERROR:
    case SEARCH_ADV_SKENARIOPRIORITAS_ERROR:
    case EXPORTCSV_SKENARIOPRIORITAS_ERROR:
    case EXPORTEXCEL_SKENARIOPRIORITAS_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data.status,
            error: action.data.data,
        };
    case ADD_SKENARIOPRIORITAS:
    case UPDATE_SKENARIOPRIORITAS:
    case DELETE_SKENARIOPRIORITAS:
        return {
            ...state,
            fetch: true,
            action: action.type,
            error: action.data,
            response: null
        };
    case ADD_SKENARIOPRIORITAS_SUCCESS:
    case UPDATE_SKENARIOPRIORITAS_SUCCESS:
    case DELETE_SKENARIOPRIORITAS_SUCCESS:
    case EXPORTCSV_SKENARIOPRIORITAS_SUCCESS:
    case EXPORTEXCEL_SKENARIOPRIORITAS_SUCCESS:
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

export default SkenarioPrioritasReducers;
