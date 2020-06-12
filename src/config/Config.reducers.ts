import { ReducerAuth } from '../reducer';
import { sidebarVisibilityReducer, sweetAlertReducer } from '../redux-global/Global.reducers';

const configReducer = {
    auth: ReducerAuth,
    sidebarVisibility: sidebarVisibilityReducer,
    sweetAlert: sweetAlertReducer,
};

export default configReducer;