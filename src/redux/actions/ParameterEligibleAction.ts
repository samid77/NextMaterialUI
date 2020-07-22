import { 
    GET_PARAMETERELIGIBLE,
    PARAMETERELIGIBLE_SUCCESS, 
    PARAMETERELIGIBLE_ERROR
} from '../constants/ParameterEligibleConstants';
import { ParameterEligibleAction, ParameterEligible } from '../../interfaces/ParameterEligible';

export const getParameterEligible = (params: any): ParameterEligibleAction => ({type: GET_PARAMETERELIGIBLE, data: params});
export const parameterEligibleSuccess = (data: ParameterEligible[]): ParameterEligibleAction => ({type: PARAMETERELIGIBLE_SUCCESS, data: data});
export const parameterEligibleError = (error: any): ParameterEligibleAction => ({type: PARAMETERELIGIBLE_ERROR, data: error});