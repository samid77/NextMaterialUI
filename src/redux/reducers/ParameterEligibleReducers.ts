import { 
    GET_PARAMETERELIGIBLE, 
    PARAMETERELIGIBLE_SUCCESS, 
    PARAMETERELIGIBLE_ERROR,
} from '../constants/ParameterEligibleConstants';

import { ParameterEligibleState, ParameterEligibleAction } from '../../interfaces/ParameterEligible';

const initialState: ParameterEligibleState = {
    fetch: false,
    error: null,
    response: undefined,
    action: '',
    data: undefined
}

const ParameterEligibleReducers = (state: ParameterEligibleState = initialState, action: ParameterEligibleAction): ParameterEligibleState => {
    switch (action.type) {
        case GET_PARAMETERELIGIBLE:
            return {
                ...state,
                fetch: true,
                action: action.type
            };
        case PARAMETERELIGIBLE_SUCCESS: {
            console.log(action.data)
            return {
                ...state,
                fetch: false,
                action: action.type,
                data: action.data.data,
                response: action.data.status
            };
        }
        case PARAMETERELIGIBLE_ERROR: {
            return {
                ...state,
                fetch: false,
                action: action.type,
                response: action.data.status,
                error: action.data
            };
        }
        default:
            return state;
    }
}

export default ParameterEligibleReducers;