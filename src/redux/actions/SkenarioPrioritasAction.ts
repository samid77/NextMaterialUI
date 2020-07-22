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
    RESET_SEARCH_SKENARIOPRIORITAS } from '../constants/SkenarioPrioritasConstants';
import { SkenarioPrioritasAction, SkenarioPrioritas, SkenarioPrioritasFilter } from '../../interfaces/SkenarioPrioritas';

export const getSkenarioPrioritas = (params: any): SkenarioPrioritasAction => ({type: GET_SKENARIOPRIORITAS, data: params});
export const skenarioPrioritasSuccess = (data: SkenarioPrioritas[]): SkenarioPrioritasAction => ({type: SKENARIOPRIORITAS_SUCCESS, data: data});
export const skenarioPrioritasError = (error: any): SkenarioPrioritasAction => ({type: SKENARIOPRIORITAS_ERROR, data: error});

export const addSkenarioPrioritas = (skenarioprioritas: SkenarioPrioritas): SkenarioPrioritasAction => ({type: ADD_SKENARIOPRIORITAS, data: skenarioprioritas});
export const addSkenarioPrioritasSuccess = (response: any): SkenarioPrioritasAction => ({type: ADD_SKENARIOPRIORITAS_SUCCESS, data: response});
export const addSkenarioPrioritasError = (error: any): SkenarioPrioritasAction => ({type: ADD_SKENARIOPRIORITAS_ERROR, data: error});

export const updateSkenarioPrioritas = (skenarioprioritas: SkenarioPrioritas): SkenarioPrioritasAction => ({type: UPDATE_SKENARIOPRIORITAS, data: skenarioprioritas});
export const updateSkenarioPrioritasSuccess = (response: any): SkenarioPrioritasAction => ({type: UPDATE_SKENARIOPRIORITAS_SUCCESS, data: response});
export const updateSkenarioPrioritasError = (error: any): SkenarioPrioritasAction => ({type: UPDATE_SKENARIOPRIORITAS_ERROR, data: error});

export const deleteSkenarioPrioritas = (skenarioPrioritasId: any): SkenarioPrioritasAction => ({type: DELETE_SKENARIOPRIORITAS, data: skenarioPrioritasId});
export const deleteSkenarioPrioritasSuccess = (response: any): SkenarioPrioritasAction => ({type: DELETE_SKENARIOPRIORITAS_SUCCESS, data: response});
export const deleteSkenarioPrioritasError = (error: any): SkenarioPrioritasAction => ({type: DELETE_SKENARIOPRIORITAS_ERROR, data: error});

export const searchSkenarioPrioritas = (keywords: any): SkenarioPrioritasAction => ({type: SEARCH_SKENARIOPRIORITAS, data: keywords});
export const searchSkenarioPrioritasSuccess = (data: SkenarioPrioritas[]): SkenarioPrioritasAction => ({type: SEARCH_SKENARIOPRIORITAS_SUCCESS, data: data});
export const searchSkenarioPrioritasError = (error: any): SkenarioPrioritasAction => ({type: SEARCH_SKENARIOPRIORITAS_ERROR, data: error});

export const searchAdvSkenarioPrioritas = (params: SkenarioPrioritasFilter): SkenarioPrioritasAction => ({type: SEARCH_ADV_SKENARIOPRIORITAS, data: params});
export const searchAdvSkenarioPrioritasSuccess = (data: SkenarioPrioritas[]): SkenarioPrioritasAction => ({type: SEARCH_ADV_SKENARIOPRIORITAS_SUCCESS, data: data});
export const searchAdvSkenarioPrioritasError = (error: any): SkenarioPrioritasAction => ({type: SEARCH_ADV_SKENARIOPRIORITAS_ERROR, data: error});

export const exportCSVSkenarioPrioritas = (params: any): SkenarioPrioritasAction => ({type: EXPORTCSV_SKENARIOPRIORITAS, data: params});
export const exportCSVSkenarioPrioritasSuccess = (data: SkenarioPrioritas[]): SkenarioPrioritasAction => ({type: EXPORTCSV_SKENARIOPRIORITAS_SUCCESS, data: data});
export const exportCSVSkenarioPrioritasError = (error: any): SkenarioPrioritasAction => ({type: EXPORTCSV_SKENARIOPRIORITAS_ERROR, data: error});

export const exportExcelSkenarioPrioritas = (params: any): SkenarioPrioritasAction => ({type: EXPORTEXCEL_SKENARIOPRIORITAS, data: params});
export const exportExcelSkenarioPrioritasSuccess = (data: SkenarioPrioritas[]): SkenarioPrioritasAction => ({type: EXPORTEXCEL_SKENARIOPRIORITAS_SUCCESS, data: data});
export const exportExcelSkenarioPrioritasError = (error: any): SkenarioPrioritasAction => ({type: EXPORTEXCEL_SKENARIOPRIORITAS_ERROR, data: error});

export const resetSearchSkenarioPrioritas = (params: any): SkenarioPrioritasAction => ({type: RESET_SEARCH_SKENARIOPRIORITAS, data: params});