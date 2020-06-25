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

export const getProdukData = (params: any): ProdukDataAction => ({type: GET_PRODUK, data: params});
export const produkDataSuccess = (data: ProdukData[]): ProdukDataAction => ({type: PRODUK_SUCCESS, data: data});
export const produkDataError = (error: any): ProdukDataAction => ({type: PRODUK_ERROR, data: error});

export const addProdukData = (produk: ProdukData): ProdukDataAction => ({type: ADD_PRODUK, data: produk});
export const addProdukDataSuccess = (response: any): ProdukDataAction => ({type: ADD_PRODUK_SUCCESS, data: response});
export const addProdukDataError = (error: any): ProdukDataAction => ({type: ADD_PRODUK_ERROR, data: error});

export const updateProdukData = (produk: ProdukData): ProdukDataAction => ({type: UPDATE_PRODUK, data: produk});
export const updateProdukDataSuccess = (response: any): ProdukDataAction => ({type: UPDATE_PRODUK_SUCCESS, data: response});
export const updateProdukDataError = (error: any): ProdukDataAction => ({type: UPDATE_PRODUK_ERROR, data: error});

export const deleteProdukData = (produkId: any): ProdukDataAction => ({type: DELETE_PRODUK, data: produkId});
export const deleteProdukDataSuccess = (response: any): ProdukDataAction => ({type: DELETE_PRODUK_SUCCESS, data: response});
export const deleteProdukDataError = (error: any): ProdukDataAction => ({type: DELETE_PRODUK_ERROR, data: error});

export const searchProdukData = (keywords: any): ProdukDataAction => ({type: SEARCH_PRODUK, data: keywords});
export const searchProdukDataSuccess = (data: ProdukData[]): ProdukDataAction => ({type: SEARCH_PRODUK_SUCCESS, data: data});
export const searchProdukDataError = (error: any): ProdukDataAction => ({type: SEARCH_PRODUK_ERROR, data: error});

export const resetSearchProdukData = (params: any): ProdukDataAction => ({type: RESET_SEARCH_PRODUK, data: params});