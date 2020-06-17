import { DefaultState, DefaultAction } from 'configurations/interfaces/redux';

import {
  TESTREDUX
} from 'redux/constants/TestConstants';

import {
  defaultState,
  defaultAction
} from 'configurations/redux';

const TestReducers = (state: DefaultState = defaultState, action: DefaultAction = defaultAction) => {
  switch (action.type) {
    case TESTREDUX:
      return {
        ...state,
        response: action.data,
        action: action.type,
      };

    default:
      return state;
  }
}

export default TestReducers;
