import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BootstrapSweetAlert from 'react-bootstrap-sweetalert';
import {
  SHOW_SWEET_ALERT,
  CONFIRM_SWEET_ALERT, CANCEL_SWEET_ALERT,
  cancelSweetAlert, confirmSweetAlert, initialSweetAlert,
} from '../redux-global/Global.actions';
import { useAlertSelector } from '../custom-hook/Selectors';

export function SweetAlert() {
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);

  const { actionSweetAlert, dataSweetAlert } = useAlertSelector();

  const confirm = () => dispatch(confirmSweetAlert());
  const cancel = () => dispatch(cancelSweetAlert());

  useEffect(() => {
    if (actionSweetAlert === SHOW_SWEET_ALERT && !isOpen) {
      setOpen(true);
      return;
    }

    if (actionSweetAlert === CONFIRM_SWEET_ALERT || actionSweetAlert === CANCEL_SWEET_ALERT) {
      setOpen(false);
      dispatch(initialSweetAlert());
    }
  }, [actionSweetAlert, isOpen, dispatch]);

  const {
    type, title,
    confirmBtnText, confirmBtnBsStyle,
    cancelBtnText, cancelBtnBsStyle,
    focusConfirmBtn,
    showConfirm, showCancel,
    children, showCloseButton, customClass,
    reverseButtons,
  } = dataSweetAlert;

  return (
    <BootstrapSweetAlert
      type={type}
      title={title || 'Alert Title'}
      confirmBtnText={confirmBtnText || 'Yes'}
      confirmBtnBsStyle={confirmBtnBsStyle || 'default'}
      cancelBtnText={cancelBtnText || 'Cancel'}
      cancelBtnBsStyle={cancelBtnBsStyle || 'default'}
      focusConfirmBtn={focusConfirmBtn}
      showConfirm={showConfirm}
      showCancel={showCancel}
      showCloseButton={showCloseButton}
      customClass={customClass}
      onConfirm={confirm}
      onCancel={cancel}
      allowEscape
      closeOnClickOutside
      show={isOpen}
      reverseButtons={reverseButtons}
    >
      {children}
    </BootstrapSweetAlert>
  );
}
