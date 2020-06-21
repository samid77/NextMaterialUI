import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';

import { SearchInputCustom } from './SearchInputCustom';

import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { green, purple, red } from '@material-ui/core/colors';

import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import InputMask from 'react-input-mask';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  buttons: {
    margin: theme.spacing(1)
  },
  advanceSearch: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[700],
    },
  },
  formControl: {
    minWidth: 520,
  },
  formControlSearch: {
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dialogAction: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  dialogContent: {
    marginTop: theme.spacing(-2)
  },
  dateLabel: {
    marginBottom: theme.spacing(-6)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

interface NamaProdukType {
  nama: string;
}

export function ProdukToolbar(props) {
  const dispatch = useDispatch();
  const { className, ...rest } = props;
  const [openForm, setOpenForm] = React.useState(false);
  const [openAdvanceSearch, setOpenAdvanceSearch] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const openFormModal = () => {
    setOpenForm(true);
  };

  const closeFormModal = () => {
    setOpenForm(false);
  };

  const openSearchModal = () => {
    setOpenAdvanceSearch(true);
  };

  const closeSearchModal = () => {
    setOpenAdvanceSearch(false);
  };

  const handleChangeApprovalStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setApprovalStatus(event.target.value as string);
  };

  const [values, setValues] = useState({});

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSearch = event => {}

  const addProduk = () => {}

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <SweetAlert 
        success 
        title="Data Added!" 
        customButtons={
          <React.Fragment>
            <Button
                color="primary"
                variant="contained"
                className={classes.buttons}
                onClick={() => setSuccessAlert(false)}
            >
              <a style={{color: "white", textDecoration: "none"}}>OK</a>
            </Button>
          </React.Fragment>
        } 
        show={successAlert} 
        onConfirm={() => setSuccessAlert(false)}>
        Data is successfully added!
      </SweetAlert>
      <div className={classes.row}>
        <SearchInputCustom
          className={classes.searchInput}
          onKeyUp={handleSearch}
          placeholder="Cari Produk"/>
        <span className={classes.spacer} />
        <Button
          variant="contained"
          className={classes.advanceSearch}
          startIcon={<PageviewRoundedIcon />}
          onClick={openSearchModal}>
          <a style={{color: "white", textDecoration: "none"}}>Advanced Search</a>
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={classes.buttons}
          startIcon={<PublishRoundedIcon />}>
          <a style={{color: "white", textDecoration: "none"}}>Export to CSV</a>
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className={classes.buttons}
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={openFormModal}>
          <a style={{color: "white", textDecoration: "none"}}>Tambah Produk</a>
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={closeFormModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="tambahdataProduk">Tambah Data Produk</DialogTitle>
        <DialogContent className={classes.dialogContent}>
           <form autoComplete="off" noValidate>
            <CardContent></CardContent>
            <Divider />
          </form>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <Button
              color="secondary"
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              onClick={addProduk}>
              Simpan Data
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openAdvanceSearch}
        onClose={closeSearchModal}
        fullWidth={true}
        maxWidth={'sm'}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="alert-dialog-title">{"Cari Data Produk"}</DialogTitle>
        <DialogContent>
          <form autoComplete="off" noValidate>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSearchModal} color="primary" autoFocus>
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ProdukToolbar.propTypes = {
  className: PropTypes.string
};

export default ProdukToolbar;
