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
    DELETE_MITRA_ERROR } from '../constants/MitraConstants';
import { 
    MitraDataAction, 
    MitraData, 
     } from '../../interfaces/MitraData';

export const getMitraData = (params: any): MitraDataAction => ({type: GET_MITRA, data: params});
export const mitraDataSuccess = (data: MitraData[]): MitraDataAction => ({type: MITRA_SUCCESS, data: data});
export const mitraDataError = (error: any): MitraDataAction => ({type: MITRA_ERROR, data: error});

export const addMitraData = (mitra: MitraData): MitraDataAction => ({type: ADD_MITRA, data: mitra});
export const addMitraDataSuccess = (response: any): MitraDataAction => ({type: ADD_MITRA_SUCCESS, data: response});
export const addMitraDataError = (error: any): MitraDataAction => ({type: ADD_MITRA_ERROR, data: error});
