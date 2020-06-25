import axios, { AxiosRequestConfig, Method } from 'axios';
// import 'dotenv/config';
import { Store } from '../redux/core/store';

const resTimeout = `Looks like the server is taking too long to respond, 
this can be caused by either poor connectivity or an error with our server. Please try again in a while`;

const getRequestOptions = (method: Method, data?: any, headers?: object, reqOptions?: AxiosRequestConfig) => {
  const getReduxState: any = Store.getState();

  let Authorization;
  let parseHeaders: any = {
    'Content-Type': 'application/json',
  };

  if (getReduxState && getReduxState.auth && getReduxState.auth.token) {
    const token = getReduxState.auth.token;
    Authorization = `Bearer ${token}`;
    parseHeaders.Authorization = Authorization;
  }

  try {
    if (headers) parseHeaders = { ...parseHeaders, ...headers };

    let requestOptions: AxiosRequestConfig = {
      method,
      headers: parseHeaders,
      data,
      timeout: 60000,
    };

    if (reqOptions) requestOptions = { ...requestOptions, ...reqOptions };

    return requestOptions;
  } catch (error) {
    const errorMessage = `Something went wrong when preparing request options to fetch data: ${error.message}`;
    return errorMessage;
  }
};

const doFetch = (requestOptions: AxiosRequestConfig, url: string) => {
  if (typeof requestOptions !== 'object') {
    const errorMessage: string = requestOptions;
    return errorMessage;
  }

  // const APIHOST = process.env.REACT_APP_APIHOST;
  // const APIPORT = process.env.REACT_APP_APIPORT;
  // const APIPROTOCOL = process.env.REACT_APP_APIPROTOCOL;

  // const path = url.includes('https://') || url.includes('http://') ? url : `${APIPROTOCOL}://${APIHOST}:${APIPORT}/${url}`;
  const path = url;

  return axios(path, requestOptions)
    .then((result: any) => {
      return result;
    })
    .catch(err => {
      let error = err.response || JSON.parse(JSON.stringify(err));
      if (error.code === 'ECONNABORTED') {
        error = { message: resTimeout };
        throw error;
      }
      throw error;
    });
};

export const HttpService = {
  get(url: string, headers?: object, reqOptions?: object) {
    try {
      // const requestOptions: any = getRequestOptions('GET', null, headers, reqOptions);
      return doFetch({}, url);
    } catch (error) {
      const errorMessage = `error at get request method with error: ${error.message}`;
      console.log(errorMessage);
      return errorMessage;
    }
  },
  post(url: string, data: any, headers?: object, reqOptions?: object) {
    try {
      const requestOptions: any = getRequestOptions('POST', data, headers, reqOptions);
      return doFetch(requestOptions, url);
    } catch (error) {
      const errorMessage = `error at post request method with error: ${error.message}`;
      console.log(errorMessage);
      return errorMessage;
    }
  },
  put(url: string, data: any, headers?: object, reqOptions?: object) {
    try {
      const requestOptions: any = getRequestOptions('PUT', data, headers, reqOptions);
      return doFetch(requestOptions, url);
    } catch (error) {
      const errorMessage = `error at put request method with error: ${error.message}`;
      console.log(errorMessage);
      return errorMessage;
    }
  },
  delete(url: string, headers?: object, reqOptions?: object) {
    try {
      const requestOptions: any = getRequestOptions('DELETE', null, headers, reqOptions);
      return doFetch(requestOptions, url);
    } catch (error) {
      const errorMessage = `error at delete request method with error: ${error.message}`;
      console.log(errorMessage);
      return errorMessage;
    }
  },
};
