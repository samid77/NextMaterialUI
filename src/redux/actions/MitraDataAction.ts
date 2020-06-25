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
    RESET_SEARCH_MITRA } from '../constants/MitraConstants';
import { MitraDataAction, MitraData } from '../../interfaces/MitraData';

export const getMitraData = (params: any): MitraDataAction => ({type: GET_MITRA, data: params});
export const mitraDataSuccess = (data: MitraData[]): MitraDataAction => ({type: MITRA_SUCCESS, data: data});
export const mitraDataError = (error: any): MitraDataAction => ({type: MITRA_ERROR, data: error});

export const addMitraData = (mitra: MitraData): MitraDataAction => ({type: ADD_MITRA, data: mitra});
export const addMitraDataSuccess = (response: any): MitraDataAction => ({type: ADD_MITRA_SUCCESS, data: response});
export const addMitraDataError = (error: any): MitraDataAction => ({type: ADD_MITRA_ERROR, data: error});

export const updateMitraData = (mitra: MitraData): MitraDataAction => ({type: UPDATE_MITRA, data: mitra});
export const updateMitraDataSuccess = (response: any): MitraDataAction => ({type: UPDATE_MITRA_SUCCESS, data: response});
export const updateMitraDataError = (error: any): MitraDataAction => ({type: UPDATE_MITRA_ERROR, data: error});

export const deleteMitraData = (mitraId: any): MitraDataAction => ({type: DELETE_MITRA, data: mitraId});
export const deleteMitraDataSuccess = (response: any): MitraDataAction => ({type: DELETE_MITRA_SUCCESS, data: response});
export const deleteMitraDataError = (error: any): MitraDataAction => ({type: DELETE_MITRA_ERROR, data: error});

export const searchMitraData = (keywords: any): MitraDataAction => ({type: SEARCH_MITRA, data: keywords});
export const searchMitraDataSuccess = (data: MitraData[]): MitraDataAction => ({type: SEARCH_MITRA_SUCCESS, data: data});
export const searchMitraDataError = (error: any): MitraDataAction => ({type: SEARCH_MITRA_ERROR, data: error});

export const resetSearchMitraData = (params: any): MitraDataAction => ({type: RESET_SEARCH_MITRA, data: params});
