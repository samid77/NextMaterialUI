import { useSelector } from 'react-redux';
import { AppState } from '../core/Core.reducers';
import { SweetAlertConfig } from '../interfaces';

export function useAuthSelector() {
  const { fetchAuth, dataAuth, resAuth, errAuth, actionAuth } = useSelector((state: AppState) => ({
    fetchAuth: state.auth ? state.auth.fetch : null,
    dataAuth: state.auth ? state.auth.data : null,
    resAuth: state.auth ? state.auth.res : null,
    errAuth: state.auth ? state.auth.err : null,
    actionAuth: state.auth ? state.auth.action : null,
  }));

  return { fetchAuth, dataAuth, resAuth, errAuth, actionAuth };
}

export function useSidebarVisibilitySelector() {
  const { actionSidebar } = useSelector((state: AppState) => ({
    actionSidebar: state.sidebarVisibility ? state.sidebarVisibility.action : null,
  }));

  return { actionSidebar };
}

export function useAlertSelector() {
  const { actionSweetAlert, data } = useSelector((state: AppState) => ({
    actionSweetAlert: state.sweetAlert ? state.sweetAlert.action : null,
    data: state.sweetAlert ? state.sweetAlert.data : null,
  }));

  const dataSweetAlert: SweetAlertConfig = { ...data };

  return { actionSweetAlert, dataSweetAlert };
}
