import { PesertaEligibleListState, PesertaEligibleAction } from "../../interfaces/PesertaEligible";
import { 
	GET_PESERTA_ELIGIBLE,
	SEARCH_ADV_PESERTA_ELIGIBLE,
	SEARCH_PESERTA_ELIGIBLE,
	EXPORTCSV_PESERTA_ELIGIBLE,
	EXPORTEXCEL_PESERTA_ELIGIBLE,
	PESERTA_ELIGIBLE_SUCCESS,
	SEARCH_PESERTA_ELIGIBLE_SUCCESS,
	SEARCH_ADV_PESERTA_ELIGIBLE_SUCCESS,
	PESERTA_ELIGIBLE_ERROR,
	SEARCH_PESERTA_ELIGIBLE_ERROR,
	SEARCH_ADV_PESERTA_ELIGIBLE_ERROR,
	EXPORTCSV_PESERTA_ELIGIBLE_SUCCESS,
	EXPORTEXCEL_PESERTA_ELIGIBLE_SUCCESS,
	EXPORTCSV_PESERTA_ELIGIBLE_ERROR,
	EXPORTEXCEL_PESERTA_ELIGIBLE_ERROR
} from "../constants/PesertaEligibleConstants";

const initialState: PesertaEligibleListState = {
	fetch: false,
	error: null,
	response: undefined,
	action: '',
	data: []
}

const PesertaEligibleReducers = (state: PesertaEligibleListState = initialState, action: PesertaEligibleAction): PesertaEligibleListState => {
	switch(action.type) {
		case GET_PESERTA_ELIGIBLE:
		case SEARCH_PESERTA_ELIGIBLE:
		case SEARCH_ADV_PESERTA_ELIGIBLE:
		case EXPORTCSV_PESERTA_ELIGIBLE:
		case EXPORTEXCEL_PESERTA_ELIGIBLE:
			return {
				...state,
				fetch: true,
				action: action.type,
			};
		case PESERTA_ELIGIBLE_SUCCESS:
		case SEARCH_PESERTA_ELIGIBLE_SUCCESS:
		case SEARCH_ADV_PESERTA_ELIGIBLE_SUCCESS:
			return {
				...state,
				fetch: false,
				action: action.type,
				data: action.data,
			};
		case PESERTA_ELIGIBLE_ERROR:
		case SEARCH_PESERTA_ELIGIBLE_ERROR:
		case SEARCH_ADV_PESERTA_ELIGIBLE_ERROR:
		case EXPORTCSV_PESERTA_ELIGIBLE_ERROR:
    	case EXPORTEXCEL_PESERTA_ELIGIBLE_ERROR:
			return {
				...state,
				fetch: false,
				action: action.type,
				response: action.data.status,
				error: action.data.data,
				data: []
			};
		case EXPORTCSV_PESERTA_ELIGIBLE_SUCCESS:
    	case EXPORTEXCEL_PESERTA_ELIGIBLE_SUCCESS:
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
export default PesertaEligibleReducers;