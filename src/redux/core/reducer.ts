import { combineReducers } from 'redux';
import LoadReducers from 'redux/reducers';
import hookReducer from 'redux/core/hook';
 
let reduxReducer: any = combineReducers(LoadReducers);
 
if (Object.keys(LoadReducers).length === 0 && LoadReducers.constructor === Object) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialReducer: any = (state: any = [], action: any) => state;
  reduxReducer = combineReducers({ initialReducer } as any);
}
 
const hooks: any = (state: any, action: any) => {
  const hook = hookReducer(state, action);
  return reduxReducer(hook.state, hook.action);
};
 
export default hooks;