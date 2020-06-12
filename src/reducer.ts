import { actionTypes } from './actions'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null,
  fetch: false, // set to true/false if its related with api call
  data: null, // payload here
  res: null, // response for success action here. if not related to API cal, put value here
  err: null, // response for failed action here
  action: '',
}

function reducer(state, action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }

    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      }

    case actionTypes.INCREMENT:
      return {
        ...state,
        ...{ count: state.count + 1 },
      }

    case actionTypes.DECREMENT:
      return {
        ...state,
        ...{ count: state.count - 1 },
      }

    case actionTypes.RESET:
      return {
        ...state,
        ...{ count: initialState.count },
      }

    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ placeholderData: action.data },
      }

    case actionTypes.TICK_CLOCK:
      return {
        ...state,
        ...{ lastUpdate: action.ts, light: !!action.light },
      }

    case actionTypes.FETCH_LOGIN:
      console.log(`Fetch Login Reducer called`)
      return {
        ...state,
        ...{ fetch: true, data: action.data, action: action.type },
      }

    case actionTypes.FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        ...{ fetch: false, data: action.data, action: action.type },
      }

    case actionTypes.FETCH_LOGIN_FAILED:
      return {
        ...state,
        ...{ fetch: false, data: action.data, action: action.type },
      }

    default:
      return state
  }
}

export default reducer
