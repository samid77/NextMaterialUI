import { 
    INDEX_PAGE,
    INDEX_PAGE_SUCCESS,
    INDEX_PAGE_ERROR,
    ANOTHER_PAGE,
    ANOTHER_PAGE_SUCCESS,
    ANOTHER_PAGE_ERROR,
} from '../constants/LayoutConstants';
import { LayoutAction } from '../../interfaces/Layout';

export const isIndexPage = (params: boolean): LayoutAction => ({type: INDEX_PAGE, data: params});
export const isIndexPageSuccess = (params: boolean): LayoutAction => ({type: INDEX_PAGE_SUCCESS, data: params});
export const isIndexPageError = (params: boolean): LayoutAction => ({type: INDEX_PAGE_ERROR, data: params});
export const isAnotherPage = (params: boolean): LayoutAction => ({type: ANOTHER_PAGE, data: params});
export const isAnotherPageSuccess = (params: boolean): LayoutAction => ({type: ANOTHER_PAGE_SUCCESS, data: params});
export const isAnotherPageError = (params: boolean): LayoutAction => ({type: ANOTHER_PAGE_ERROR, data: params});