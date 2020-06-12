import 'dotenv/config';
import { SweetAlertConfig, AlertState } from '../interfaces';
import { CONFIRM_SWEET_ALERT } from '../redux-global/Global.actions';

export const apiKey = process.env.REACT_APP_KEY;
export const baseUrl = process.env.REACT_APP_BASE_URL;

export const initialState = {
  fetch: false, // set to true/false if its related with api call
  data: null, // payload here
  res: null, // response for success action here. if not related to API cal, put value here
  err: null, // response for failed action here
  action: '',
};

export const initialAction = {
  type: 'DEFAULT',
  data: null,
};

export const companyName = 'Company Name';

export const defaultSweetAlertConfig: SweetAlertConfig = {
  type: 'default',
  title: 'Example Title',
  children: 'Example Message Alert',
  cancelAction: CONFIRM_SWEET_ALERT,
  confirmAction: CONFIRM_SWEET_ALERT,
};

export const defaultSweetAlertState: AlertState = {
  ...initialState,
  data: { ...defaultSweetAlertConfig },
};

export const defaultErrorAlertConfig: SweetAlertConfig = {
  type: 'error',
  title: 'Error',
  children: 'Error',
  confirmBtnText: 'Dismiss',
  confirmBtnBsStyle: 'warning',
};

export const defaultWarningAlertConfig: SweetAlertConfig = {
  type: 'warning',
  title: 'Attention!',
  children: 'Are you sure to execute this action? This action cannot be undone.',
};

export const defaultInfoAlertConfig: SweetAlertConfig = {
  type: 'info',
  title: 'Information',
  children: 'Information Alert',
};

export const defaultUnauthorizedAlertConfig: SweetAlertConfig = {
  type: 'error',
  title: 'Attention!',
  children: 'You are restricted to this data or action',
};

export const defaultLoadingAlertConfig: SweetAlertConfig = {
  type: 'info',
  title: 'Initialize...',
  children: 'Please wait a moment',
};

export const defaultSuccessAlertConfig: SweetAlertConfig = {
  type: 'success',
  title: 'Congratulation!',
  children: 'Action Success!',
};
