import { 
    GET_SKENARIOKUOTA, 
    SKENARIOKUOTA_SUCCESS, 
    SKENARIOKUOTA_ERROR,
    ADD_SKENARIOKUOTA, 
    ADD_SKENARIOKUOTA_SUCCESS, 
    ADD_SKENARIOKUOTA_ERROR,
    UPDATE_SKENARIOKUOTA, 
    UPDATE_SKENARIOKUOTA_SUCCESS, 
    UPDATE_SKENARIOKUOTA_ERROR,
    DELETE_SKENARIOKUOTA, 
    DELETE_SKENARIOKUOTA_SUCCESS, 
    DELETE_SKENARIOKUOTA_ERROR,
    SEARCH_SKENARIOKUOTA, 
    SEARCH_SKENARIOKUOTA_SUCCESS, 
    SEARCH_SKENARIOKUOTA_ERROR,
    SEARCH_ADV_SKENARIOKUOTA, 
    SEARCH_ADV_SKENARIOKUOTA_SUCCESS, 
    SEARCH_ADV_SKENARIOKUOTA_ERROR,
    EXPORTCSV_SKENARIOKUOTA,
    EXPORTCSV_SKENARIOKUOTA_SUCCESS, 
    EXPORTCSV_SKENARIOKUOTA_ERROR,
    EXPORTEXCEL_SKENARIOKUOTA,
    EXPORTEXCEL_SKENARIOKUOTA_SUCCESS, 
    EXPORTEXCEL_SKENARIOKUOTA_ERROR,
    RESET_SEARCH_SKENARIOKUOTA
} from '../constants/SkenarioKuotaConstants';
import { SkenarioKuotaListState, SkenarioKuotaAction } from '../../interfaces/SkenarioKuota';

const initialState: SkenarioKuotaListState = {
    fetch: false,
    error: null,
    response: undefined,
    action: '',
    data: []
}

const SkenarioKuotaReducers = (state: SkenarioKuotaListState = initialState, action: SkenarioKuotaAction): SkenarioKuotaListState => {
  switch (action.type) {
    case GET_SKENARIOKUOTA:
    case SEARCH_SKENARIOKUOTA:
    case SEARCH_ADV_SKENARIOKUOTA:
    case RESET_SEARCH_SKENARIOKUOTA:
    case EXPORTCSV_SKENARIOKUOTA:
    case EXPORTEXCEL_SKENARIOKUOTA:
        return {
            ...state,
            fetch: true,
            action: action.type,
        };
    case SKENARIOKUOTA_SUCCESS:
    case SEARCH_SKENARIOKUOTA_SUCCESS:
    case SEARCH_ADV_SKENARIOKUOTA_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            data: action.data
        };
    case SKENARIOKUOTA_ERROR: 
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data.status,
            error: action.data.data,
            data: []
        }
    case ADD_SKENARIOKUOTA_ERROR:
    case UPDATE_SKENARIOKUOTA_ERROR:
    case DELETE_SKENARIOKUOTA_ERROR:
    case SEARCH_SKENARIOKUOTA_ERROR:
    case SEARCH_ADV_SKENARIOKUOTA_ERROR:
    case EXPORTCSV_SKENARIOKUOTA_ERROR:
    case EXPORTEXCEL_SKENARIOKUOTA_ERROR:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data.status,
            error: action.data.data,
        };
    case ADD_SKENARIOKUOTA:
    case UPDATE_SKENARIOKUOTA:
    case DELETE_SKENARIOKUOTA:
        return {
            ...state,
            fetch: true,
            action: action.type,
            error: action.data
        };
    case ADD_SKENARIOKUOTA_SUCCESS:
    case UPDATE_SKENARIOKUOTA_SUCCESS:
    case DELETE_SKENARIOKUOTA_SUCCESS:
    case EXPORTCSV_SKENARIOKUOTA_SUCCESS:
    case EXPORTEXCEL_SKENARIOKUOTA_SUCCESS:
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

export default SkenarioKuotaReducers;
