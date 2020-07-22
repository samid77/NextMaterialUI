import { PesertaPrioritasListState, PesertaPrioritasAction } from "../../interfaces/PesertaPrioritas";
import { 
	GET_PESERTA_PRIORITAS,
	SEARCH_ADV_PESERTA_PRIORITAS,
	SEARCH_PESERTA_PRIORITAS,
	EXPORTCSV_PESERTA_PRIORITAS,
	EXPORTEXCEL_PESERTA_PRIORITAS,
	PESERTA_PRIORITAS_SUCCESS,
	SEARCH_PESERTA_PRIORITAS_SUCCESS,
	SEARCH_ADV_PESERTA_PRIORITAS_SUCCESS,
	PESERTA_PRIORITAS_ERROR,
	SEARCH_PESERTA_PRIORITAS_ERROR,
	SEARCH_ADV_PESERTA_PRIORITAS_ERROR,
	EXPORTCSV_PESERTA_PRIORITAS_SUCCESS,
	EXPORTEXCEL_PESERTA_PRIORITAS_SUCCESS,
	EXPORTCSV_PESERTA_PRIORITAS_ERROR,
	EXPORTEXCEL_PESERTA_PRIORITAS_ERROR
} from "../constants/PesertaPrioritasConstants";

const initialState: PesertaPrioritasListState = {
	fetch: false,
	error: null,
	response: undefined,
	action: '',
	data: []
}

const PesertaPrioritasReducers = (state: PesertaPrioritasListState = initialState, action: PesertaPrioritasAction): PesertaPrioritasListState => {
	switch(action.type) {
		case GET_PESERTA_PRIORITAS:
		case SEARCH_PESERTA_PRIORITAS:
		case SEARCH_ADV_PESERTA_PRIORITAS:
		case EXPORTCSV_PESERTA_PRIORITAS:
		case EXPORTEXCEL_PESERTA_PRIORITAS:
			return {
				...state,
				fetch: true,
				action: action.type,
			};
		case PESERTA_PRIORITAS_SUCCESS:
		case SEARCH_PESERTA_PRIORITAS_SUCCESS:
		case SEARCH_ADV_PESERTA_PRIORITAS_SUCCESS:
			return {
				...state,
				fetch: false,
				action: action.type,
				data: action.data,
			};
		case PESERTA_PRIORITAS_ERROR:
		case SEARCH_PESERTA_PRIORITAS_ERROR:
		case SEARCH_ADV_PESERTA_PRIORITAS_ERROR:
		case EXPORTCSV_PESERTA_PRIORITAS_ERROR:
    	case EXPORTEXCEL_PESERTA_PRIORITAS_ERROR:
			return {
				...state,
				fetch: false,
				action: action.type,
				response: action.data.status,
				error: action.data.data,
				data: []
			};
		case EXPORTCSV_PESERTA_PRIORITAS_SUCCESS:
    	case EXPORTEXCEL_PESERTA_PRIORITAS_SUCCESS:
        return {
            ...state,
            fetch: false,
            action: action.type,
            response: action.data
        };
		default:
			return state
	}
}
export default PesertaPrioritasReducers;