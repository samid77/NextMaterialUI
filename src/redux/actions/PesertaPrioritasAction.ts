import { 
  PesertaPrioritasAction, 
  PesertaPrioritas, 
  PesertaPrioritasFilter 
} from "../../interfaces/PesertaPrioritas";
import { 
  GET_PESERTA_PRIORITAS, 
  PESERTA_PRIORITAS_SUCCESS, 
  PESERTA_PRIORITAS_ERROR, 
  SEARCH_PESERTA_PRIORITAS, 
  SEARCH_PESERTA_PRIORITAS_SUCCESS, 
  SEARCH_PESERTA_PRIORITAS_ERROR, 
  SEARCH_ADV_PESERTA_PRIORITAS, 
  SEARCH_ADV_PESERTA_PRIORITAS_SUCCESS, 
  SEARCH_ADV_PESERTA_PRIORITAS_ERROR, 
  EXPORTCSV_PESERTA_PRIORITAS, 
  EXPORTCSV_PESERTA_PRIORITAS_SUCCESS, 
  EXPORTCSV_PESERTA_PRIORITAS_ERROR, 
  EXPORTEXCEL_PESERTA_PRIORITAS, 
  EXPORTEXCEL_PESERTA_PRIORITAS_SUCCESS, 
  EXPORTEXCEL_PESERTA_PRIORITAS_ERROR, 
  RESET_SEARCH_PESERTA_PRIORITAS 
} from "../constants/PesertaPrioritasConstants";

export const getPesertaPrioritas = (params: any): PesertaPrioritasAction => ({type: GET_PESERTA_PRIORITAS, data: params});
export const pesertaPrioritasSuccess = (data: PesertaPrioritas[]): PesertaPrioritasAction => ({type: PESERTA_PRIORITAS_SUCCESS, data: data});
export const pesertaPrioritasError = (error: any): PesertaPrioritasAction => ({type: PESERTA_PRIORITAS_ERROR, data: error});

export const searchPesertaPrioritas = (keywords: any): PesertaPrioritasAction => ({type: SEARCH_PESERTA_PRIORITAS, data: keywords});
export const searchPesertaPrioritasSuccess = (data: PesertaPrioritas[]): PesertaPrioritasAction => ({type: SEARCH_PESERTA_PRIORITAS_SUCCESS, data: data});
export const searchPesertaPrioritasError = (error: any): PesertaPrioritasAction => ({type: SEARCH_PESERTA_PRIORITAS_ERROR, data: error});

export const searchAdvPesertaPrioritas = (params: PesertaPrioritasFilter): PesertaPrioritasAction => ({type: SEARCH_ADV_PESERTA_PRIORITAS, data: params});
export const searchAdvPesertaPrioritasSuccess = (data: PesertaPrioritas[]): PesertaPrioritasAction => ({type: SEARCH_ADV_PESERTA_PRIORITAS_SUCCESS, data: data});
export const searchAdvPesertaPrioritasError = (error: any): PesertaPrioritasAction => ({type: SEARCH_ADV_PESERTA_PRIORITAS_ERROR, data: error});

export const exportCSVPesertaPrioritas = (params: any): PesertaPrioritasAction => ({type: EXPORTCSV_PESERTA_PRIORITAS, data: params});
export const exportCSVPesertaPrioritasSuccess = (data: PesertaPrioritas[]): PesertaPrioritasAction => ({type: EXPORTCSV_PESERTA_PRIORITAS_SUCCESS, data: data});
export const exportCSVPesertaPrioritasError = (error: any): PesertaPrioritasAction => ({type: EXPORTCSV_PESERTA_PRIORITAS_ERROR, data: error});

export const exportExcelPesertaPrioritas = (params: any): PesertaPrioritasAction => ({type: EXPORTEXCEL_PESERTA_PRIORITAS, data: params});
export const exportExcelPesertaPrioritasSuccess = (data: PesertaPrioritas[]): PesertaPrioritasAction => ({type: EXPORTEXCEL_PESERTA_PRIORITAS_SUCCESS, data: data});
export const exportExcelPesertaPrioritasError = (error: any): PesertaPrioritasAction => ({type: EXPORTEXCEL_PESERTA_PRIORITAS_ERROR, data: error});

export const resetSearchPesertaPrioritas = (params: any): PesertaPrioritasAction => ({type: RESET_SEARCH_PESERTA_PRIORITAS, data: params});