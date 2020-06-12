import { ReducerAuth } from '../auth.reducer';
import { sweetAlertReducer } from '../redux-global/Global.reducers';

const configReducer = {
    auth: ReducerAuth,
    sweetAlert: sweetAlertReducer,
};

export default configReducer;