export const FETCH_LOGIN = 'FETCH_LOGIN';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILED = 'FETCH_LOGIN_FAILED';
export const fetchLogin = (data: object) => ({ type: FETCH_LOGIN, data });
export const fetchLoginSuccess = (data: object) => ({ type: FETCH_LOGIN_SUCCESS, data });
export const fetchLoginFailed = (data: object) => ({ type: FETCH_LOGIN_FAILED, data });
