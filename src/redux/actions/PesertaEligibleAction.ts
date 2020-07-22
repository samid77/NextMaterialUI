import { 
  PesertaEligibleAction, 
  PesertaEligible, 
  PesertaEligibleFilter 
} from "../../interfaces/PesertaEligible";
import { 
  GET_PESERTA_ELIGIBLE, 
  PESERTA_ELIGIBLE_SUCCESS, 
  PESERTA_ELIGIBLE_ERROR, 
  SEARCH_PESERTA_ELIGIBLE, 
  SEARCH_PESERTA_ELIGIBLE_SUCCESS, 
  SEARCH_PESERTA_ELIGIBLE_ERROR, 
  SEARCH_ADV_PESERTA_ELIGIBLE, 
  SEARCH_ADV_PESERTA_ELIGIBLE_SUCCESS, 
  SEARCH_ADV_PESERTA_ELIGIBLE_ERROR, 
  EXPORTCSV_PESERTA_ELIGIBLE, 
  EXPORTCSV_PESERTA_ELIGIBLE_SUCCESS, 
  EXPORTCSV_PESERTA_ELIGIBLE_ERROR, 
  EXPORTEXCEL_PESERTA_ELIGIBLE, 
  EXPORTEXCEL_PESERTA_ELIGIBLE_SUCCESS, 
  EXPORTEXCEL_PESERTA_ELIGIBLE_ERROR, 
  RESET_SEARCH_PESERTA_ELIGIBLE 
} from "../constants/PesertaEligibleConstants";

export const getPesertaEligible = (params: any): PesertaEligibleAction => ({type: GET_PESERTA_ELIGIBLE, data: params});
export const pesertaEligibleSuccess = (data: PesertaEligible[]): PesertaEligibleAction => ({type: PESERTA_ELIGIBLE_SUCCESS, data: data});
export const pesertaEligibleError = (error: any): PesertaEligibleAction => ({type: PESERTA_ELIGIBLE_ERROR, data: error});

export const searchPesertaEligible = (keywords: any): PesertaEligibleAction => ({type: SEARCH_PESERTA_ELIGIBLE, data: keywords});
export const searchPesertaEligibleSuccess = (data: PesertaEligible[]): PesertaEligibleAction => ({type: SEARCH_PESERTA_ELIGIBLE_SUCCESS, data: data});
export const searchPesertaEligibleError = (error: any): PesertaEligibleAction => ({type: SEARCH_PESERTA_ELIGIBLE_ERROR, data: error});

export const searchAdvPesertaEligible = (params: PesertaEligibleFilter): PesertaEligibleAction => ({type: SEARCH_ADV_PESERTA_ELIGIBLE, data: params});
export const searchAdvPesertaEligibleSuccess = (data: PesertaEligible[]): PesertaEligibleAction => ({type: SEARCH_ADV_PESERTA_ELIGIBLE_SUCCESS, data: data});
export const searchAdvPesertaEligibleError = (error: any): PesertaEligibleAction => ({type: SEARCH_ADV_PESERTA_ELIGIBLE_ERROR, data: error});

export const exportCSVPesertaEligible = (params: any): PesertaEligibleAction => ({type: EXPORTCSV_PESERTA_ELIGIBLE, data: params});
export const exportCSVPesertaEligibleSuccess = (data: PesertaEligible[]): PesertaEligibleAction => ({type: EXPORTCSV_PESERTA_ELIGIBLE_SUCCESS, data: data});
export const exportCSVPesertaEligibleError = (error: any): PesertaEligibleAction => ({type: EXPORTCSV_PESERTA_ELIGIBLE_ERROR, data: error});

export const exportExcelPesertaEligible = (params: any): PesertaEligibleAction => ({type: EXPORTEXCEL_PESERTA_ELIGIBLE, data: params});
export const exportExcelPesertaEligibleSuccess = (data: PesertaEligible[]): PesertaEligibleAction => ({type: EXPORTEXCEL_PESERTA_ELIGIBLE_SUCCESS, data: data});
export const exportExcelPesertaEligibleError = (error: any): PesertaEligibleAction => ({type: EXPORTEXCEL_PESERTA_ELIGIBLE_ERROR, data: error});

export const resetSearchPesertaEligible = (params: any): PesertaEligibleAction => ({type: RESET_SEARCH_PESERTA_ELIGIBLE, data: params});