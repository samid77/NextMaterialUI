import { SweetAlertConfig } from '../interfaces';

export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';
export const showSidebar = () => ({ type: SHOW_SIDEBAR });
export const hideSidebar = () => ({ type: HIDE_SIDEBAR });

export const SHOW_SWEET_ALERT = 'SHOW_SWEET_ALERT';
export const CONFIRM_SWEET_ALERT = 'CONFIRM_SWEET_ALERT';
export const CANCEL_SWEET_ALERT = 'CANCEL_SWEET_ALERT';
export const INITIAL_SWEET_ALERT = 'INITIAL_SWEET_ALERT';
export const showSweetAlert = (data: SweetAlertConfig) => ({ type: SHOW_SWEET_ALERT, data });
export const confirmSweetAlert = () => ({ type: CONFIRM_SWEET_ALERT }); // called only in alert component
export const cancelSweetAlert = () => ({ type: CANCEL_SWEET_ALERT }); // called only in alert component
export const initialSweetAlert = () => ({ type: INITIAL_SWEET_ALERT }); // called only in alert component

export const USER_LOG_OUT = 'USER_LOG_OUT';
export const userLogout = () => ({ type: USER_LOG_OUT });
