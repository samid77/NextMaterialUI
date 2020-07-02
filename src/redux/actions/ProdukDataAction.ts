import { 
    GET_PRODUK,
    PRODUK_SUCCESS, 
    PRODUK_ERROR,
    GET_PRODUK_FITUR,
    GET_PRODUK_FITUR_SUCCESS, 
    GET_PRODUK_FITUR_ERROR,
    GET_PRODUK_TIPE,
    GET_PRODUK_TIPE_SUCCESS, 
    GET_PRODUK_TIPE_ERROR,
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
import { ProdukDataAction, ProdukData, FiturProduk, TipeProduk } from '../../interfaces/ProdukData';

export const getProdukData = (params: any): ProdukDataAction => ({type: GET_PRODUK, data: params});
export const produkDataSuccess = (data: ProdukData[]): ProdukDataAction => ({type: PRODUK_SUCCESS, data: data});
export const produkDataError = (error: any): ProdukDataAction => ({type: PRODUK_ERROR, data: error});

export const getProdukFiturData = (params: any): ProdukDataAction => ({type: GET_PRODUK_FITUR, data: params});
export const getProdukFiturDataSuccess = (fiturProduk: FiturProduk[]): ProdukDataAction => ({type: GET_PRODUK_FITUR_SUCCESS, fiturProduk: fiturProduk});
export const getProdukFiturDataError = (error: any): ProdukDataAction => ({type: GET_PRODUK_FITUR_ERROR, data: error});

export const getProdukTipeData = (params: any): ProdukDataAction => ({type: GET_PRODUK_TIPE, data: params});
export const getProdukTipeDataSuccess = (tipeProduk: TipeProduk[]): ProdukDataAction => ({type: GET_PRODUK_TIPE_SUCCESS, tipeProduk: tipeProduk});
export const getProdukTipeDataError = (error: any): ProdukDataAction => ({type: GET_PRODUK_TIPE_ERROR, data: error});

export const addProdukData = (produk: ProdukData): ProdukDataAction => ({type: ADD_PRODUK, data: produk});
export const addProdukDataSuccess = (response: any): ProdukDataAction => ({type: ADD_PRODUK_SUCCESS, data: response});
export const addProdukDataError = (error: any): ProdukDataAction => ({type: ADD_PRODUK_ERROR, data: error});

export const deleteProdukData = (produkId: any): ProdukDataAction => ({type: DELETE_PRODUK, data: produkId});
export const deleteProdukDataSuccess = (response: any): ProdukDataAction => ({type: DELETE_PRODUK_SUCCESS, data: response});
export const deleteProdukDataError = (error: any): ProdukDataAction => ({type: DELETE_PRODUK_ERROR, data: error});

export const updateProdukData = (produk: ProdukData): ProdukDataAction => ({type: UPDATE_PRODUK, data: produk});
export const updateProdukDataSuccess = (response: any): ProdukDataAction => ({type: UPDATE_PRODUK_SUCCESS, data: response});
export const updateProdukDataError = (error: any): ProdukDataAction => ({type: UPDATE_PRODUK_ERROR, data: error});

export const searchProdukData = (keywords: any): ProdukDataAction => ({type: SEARCH_PRODUK, data: keywords});
export const searchProdukDataSuccess = (data: ProdukData[]): ProdukDataAction => ({type: SEARCH_PRODUK_SUCCESS, data: data});
export const searchProdukDataError = (error: any): ProdukDataAction => ({type: SEARCH_PRODUK_ERROR, data: error});

export const resetSearchProdukData = (params: any): ProdukDataAction => ({type: RESET_SEARCH_PRODUK, data: params});