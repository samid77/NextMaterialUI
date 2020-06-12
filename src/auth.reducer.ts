import { Action, State } from './interfaces';
import { initialAction, initialState } from './constants';
import { FETCH_LOGIN, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILED } from './auth.actions';

export function ReducerAuth(state: State = initialState, action: Action = initialAction) {
  switch (action.type) {
    case FETCH_LOGIN:
      return {
        ...state,
        fetch: true,
        data: action.data,
        action: action.type,
      };

    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        fetch: false,
        res: action.data,
        action: action.type,
      };

    case FETCH_LOGIN_FAILED:
      return {
        ...state,
        fetch: false,
        err: action.data,
        action: action.type,
      };

    default:
      return state;
  }
}

