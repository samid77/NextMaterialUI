import { GET_MITRA, MITRA_SUCCESS, MITRA_ERROR } from "../constants/MitraConstants";
import { MitraDataAction, MitraData } from "../../interfaces/MitraData";

export const getMitraData = (params: any): MitraDataAction => ({type: GET_MITRA, data: params})
export const mitraDataSuccess = (data: MitraData[]): MitraDataAction => ({type: MITRA_SUCCESS, data: data});
export const mitraDataError = (error: any): MitraDataAction => ({type: MITRA_ERROR, data: error});