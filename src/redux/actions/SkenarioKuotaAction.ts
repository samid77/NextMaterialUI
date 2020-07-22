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
    RESET_SEARCH_SKENARIOKUOTA } from '../constants/SkenarioKuotaConstants';
import { SkenarioKuotaAction, SkenarioKuota, SkenarioKuotaFilter } from '../../interfaces/SkenarioKuota';

export const getSkenarioKuota = (params: any): SkenarioKuotaAction => ({type: GET_SKENARIOKUOTA, data: params});
export const skenarioKuotaSuccess = (data: SkenarioKuota[]): SkenarioKuotaAction => ({type: SKENARIOKUOTA_SUCCESS, data: data});
export const skenarioKuotaError = (error: any): SkenarioKuotaAction => ({type: SKENARIOKUOTA_ERROR, data: error});

export const addSkenarioKuota = (skenario: SkenarioKuota): SkenarioKuotaAction => ({type: ADD_SKENARIOKUOTA, data: skenario});
export const addSkenarioKuotaSuccess = (response: any): SkenarioKuotaAction => ({type: ADD_SKENARIOKUOTA_SUCCESS, data: response});
export const addSkenarioKuotaError = (error: any): SkenarioKuotaAction => ({type: ADD_SKENARIOKUOTA_ERROR, data: error});

export const updateSkenarioKuota = (skenariokuota: SkenarioKuota): SkenarioKuotaAction => ({type: UPDATE_SKENARIOKUOTA, data: skenariokuota});
export const updateSkenarioKuotaSuccess = (response: any): SkenarioKuotaAction => ({type: UPDATE_SKENARIOKUOTA_SUCCESS, data: response});
export const updateSkenarioKuotaError = (error: any): SkenarioKuotaAction => ({type: UPDATE_SKENARIOKUOTA_ERROR, data: error});

export const deleteSkenarioKuota = (skenariokuotaId: any): SkenarioKuotaAction => ({type: DELETE_SKENARIOKUOTA, data: skenariokuotaId});
export const deleteSkenarioKuotaSuccess = (response: any): SkenarioKuotaAction => ({type: DELETE_SKENARIOKUOTA_SUCCESS, data: response});
export const deleteSkenarioKuotaError = (error: any): SkenarioKuotaAction => ({type: DELETE_SKENARIOKUOTA_ERROR, data: error});

export const searchSkenarioKuota = (keywords: any): SkenarioKuotaAction => ({type: SEARCH_SKENARIOKUOTA, data: keywords});
export const searchSkenarioKuotaSuccess = (data: SkenarioKuota[]): SkenarioKuotaAction => ({type: SEARCH_SKENARIOKUOTA_SUCCESS, data: data});
export const searchSkenarioKuotaError = (error: any): SkenarioKuotaAction => ({type: SEARCH_SKENARIOKUOTA_ERROR, data: error});

export const searchAdvSkenarioKuota = (params: SkenarioKuotaFilter): SkenarioKuotaAction => ({type: SEARCH_ADV_SKENARIOKUOTA, data: params});
export const searchAdvSkenarioKuotaSuccess = (data: SkenarioKuota[]): SkenarioKuotaAction => ({type: SEARCH_ADV_SKENARIOKUOTA_SUCCESS, data: data});
export const searchAdvSkenarioKuotaError = (error: any): SkenarioKuotaAction => ({type: SEARCH_ADV_SKENARIOKUOTA_ERROR, data: error});

export const exportCSVSkenarioKuota = (params: any): SkenarioKuotaAction => ({type: EXPORTCSV_SKENARIOKUOTA, data: params});
export const exportCSVSkenarioKuotaSuccess = (data: SkenarioKuota[]): SkenarioKuotaAction => ({type: EXPORTCSV_SKENARIOKUOTA_SUCCESS, data: data});
export const exportCSVSkenarioKuotaError = (error: any): SkenarioKuotaAction => ({type: EXPORTCSV_SKENARIOKUOTA_ERROR, data: error});

export const exportExcelSkenarioKuota = (params: any): SkenarioKuotaAction => ({type: EXPORTEXCEL_SKENARIOKUOTA, data: params});
export const exportExcelSkenarioKuotaSuccess = (data: SkenarioKuota[]): SkenarioKuotaAction => ({type: EXPORTEXCEL_SKENARIOKUOTA_SUCCESS, data: data});
export const exportExcelSkenarioKuotaError = (error: any): SkenarioKuotaAction => ({type: EXPORTEXCEL_SKENARIOKUOTA_ERROR, data: error});

export const resetSearchSkenarioKuota = (params: any): SkenarioKuotaAction => ({type: RESET_SEARCH_SKENARIOKUOTA, data: params});