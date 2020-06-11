import { SweetAlertProps } from 'react-bootstrap-sweetalert/dist/components/SweetAlert';

export interface Auth {
  auth: string;
  jwt: { token: string; expired: string };
  roles: string[];
  fullName: string;
  location: string;
}

export interface State {
  fetch: boolean;
  data: any;
  res: any;
  err: any;
  action: string;
}

export interface Action {
  type: string;
  data: any;
}

export interface SweetAlertConfig extends Omit<SweetAlertProps, 'onConfirm'> {
  children: React.ReactNode | string;
  confirmAction?: string;
  cancelAction?: string;
}

export interface AlertState extends Omit<State, 'data'> {
  data: SweetAlertConfig;
}

export interface PagingProps {
  page: number;
  totalPages: number;
  onClickPage: (page: number) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
}