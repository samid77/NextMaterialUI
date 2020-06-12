import { Action, State, AlertState } from '../interfaces';
import {
  initialAction, initialState,
  defaultSweetAlertState,
} from '../constants';
import {
  SHOW_SWEET_ALERT,
  CONFIRM_SWEET_ALERT, HIDE_SIDEBAR,
  SHOW_SIDEBAR,
  CANCEL_SWEET_ALERT,
  INITIAL_SWEET_ALERT,
} from './Global.actions';

export function sidebarVisibilityReducer(state: State = initialState, action: Action = initialAction) {
  switch (action.type) {
    case HIDE_SIDEBAR:
    case SHOW_SIDEBAR:
      return {
        ...state,
        action: action.type,
      };

    default:
      return state;
  }
}

export function sweetAlertReducer(state: AlertState = defaultSweetAlertState, action: Action = initialAction) {
  switch (action.type) {
    case SHOW_SWEET_ALERT:
      return {
        ...state,
        data: action.data,
        action: action.type,
      };
    case CONFIRM_SWEET_ALERT:
    case INITIAL_SWEET_ALERT:
    case CANCEL_SWEET_ALERT:
      return {
        ...state,
        action: action.type,
      };

    default:
      return state;
  }
}
