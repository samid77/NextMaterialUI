import { 
    GET_PRODUK,
    PRODUK_SUCCESS, 
    PRODUK_ERROR,
    ADD_PRODUK,
    ADD_PRODUK_SUCCESS, 
    ADD_PRODUK_ERROR,
    UPDATE_PRODUK,
    UPDATE_PRODUK_SUCCESS, 
    UPDATE_PRODUK_ERROR,
    DELETE_PRODUK,
    DELETE_PRODUK_SUCCESS, 
    DELETE_PRODUK_ERROR,
    SEARCH_PRODUK,
    SEARCH_PRODUK_SUCCESS, 
    SEARCH_PRODUK_ERROR,
    RESET_SEARCH_PRODUK 
} from '../constants/ProdukConstants';
import { ProdukDataAction, ProdukData } from '../../interfaces/ProdukData';

export const getProdukData = (params: any): ProdukDataAction => ({type: GET_MITRA, data: params});
export const ProdukDataSuccess = (data: ProdukData[]): ProdukDataAction => ({type: MITRA_SUCCESS, data: data});
export const ProdukDataError = (error: any): ProdukDataAction => ({type: MITRA_ERROR, data: error});

export const addProdukData = (mitra: ProdukData): ProdukDataAction => ({type: ADD_MITRA, data: mitra});
export const addProdukDataSuccess = (response: any): ProdukDataAction => ({type: ADD_MITRA_SUCCESS, data: response});
export const addProdukDataError = (error: any): ProdukDataAction => ({type: ADD_MITRA_ERROR, data: error});

export const updateProdukData = (mitra: ProdukData): ProdukDataAction => ({type: UPDATE_MITRA, data: mitra});
export const updateProdukDataSuccess = (response: any): ProdukDataAction => ({type: UPDATE_MITRA_SUCCESS, data: response});
export const updateProdukDataError = (error: any): ProdukDataAction => ({type: UPDATE_MITRA_ERROR, data: error});

export const deleteProdukData = (mitraId: any): ProdukDataAction => ({type: DELETE_MITRA, data: mitraId});
export const deleteProdukDataSuccess = (response: any): ProdukDataAction => ({type: DELETE_MITRA_SUCCESS, data: response});
export const deleteProdukDataError = (error: any): ProdukDataAction => ({type: DELETE_MITRA_ERROR, data: error});

export const searchProdukData = (keywords: any): ProdukDataAction => ({type: SEARCH_MITRA, data: keywords});
export const searchProdukDataSuccess = (data: ProdukData[]): ProdukDataAction => ({type: SEARCH_MITRA_SUCCESS, data: data});
export const searchProdukDataError = (error: any): ProdukDataAction => ({type: SEARCH_MITRA_ERROR, data: error});

export const resetSearchProdukData = (params: any): ProdukDataAction => ({type: RESET_SEARCH_MITRA, data: params});