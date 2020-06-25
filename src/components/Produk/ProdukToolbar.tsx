import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';

import { SearchInputCustom } from '../General';

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
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { ProdukDataListState, ProdukData } from '../../interfaces/ProdukData';
import { addProdukData, getProdukData, searchProdukData, resetSearchProdukData } from '../../redux/actions/ProdukDataAction';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme:any) => ({
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
    marginBottom: theme.spacing(-4)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: colors.blueGrey[600],
  },

}));

interface NamaProdukType {
  nama: string;
}
interface TipeProdukType {
  nama: string;
}

const daftarProduk = [
  { nama: 'KPR'},
  { nama: 'KRR'},
  { nama: 'KBR'},
];
const tipeProduk = [
  { nama: 'Syariah', tipe: ''},
  { nama: 'Konvensional', tipe: ''},
];

export function ProdukToolbar(props) {
  const defaultVal: ProdukData = {
    id: '',
    idFiturProduk: '',
    namaFiturProduk:'',
    idTipeProduk: '',
    namaTipeproduk:'',
    namaSegmen:'',
    penghasilanDari: 0,
    penghasilanSampai: 0,
    plafon:0,
    sukubunga:0,
    tenor:0,
    idStatusPersetujuan: '',
    statusPersetujuan:'Approved',
    created_at: '',
    created_by: '',
    updated_at: '',
    updated_by: '',
    checked_at: '',
    checked_by: '',
    approved_at: '',
    approved_by: ''
  };

  const dispatch = useDispatch();
  const { className, ...rest } = props;
  const [openForm, setOpenForm] = React.useState(false);
  const [openAdvanceSearch, setOpenAdvanceSearch] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [namaproduk, setNamaProduk] = React.useState<any | null>(daftarProduk[0]);
  const [tipeproduk, setTipeProduk] = React.useState<any | null>(tipeProduk[0]);

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

  const [values, setValues] = useState(defaultVal);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSearch = event => {
    dispatch(searchProdukData(event.target.value))
  }

  const addProduk = () => {
    values.namaFiturProduk = namaproduk.nama;
    values.namaTipeproduk = tipeproduk.nama;
    values.penghasilanDari = parseInt(values.penghasilanDari.toString().split(' ').join(''));
    values.penghasilanSampai = parseInt(values.penghasilanSampai.toString().split(' ').join(''));
    values.plafon = parseInt(values.plafon.toString().split(' ').join(''));
    values.sukubunga = parseInt(values.sukubunga.toString().split(' ').join(''));
    values.tenor = parseInt(values.tenor.toString().split(' ').join(''));

    try {
      dispatch(addProdukData(values));
      setOpenForm(false);
      setSuccessAlert(true);
    } catch (err) {
      console.error(err.message);
    }
  }

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
                onClick={() => setSuccessAlert(false)}>
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
          dispatchFunc={resetSearchProdukData('')}
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
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <Autocomplete
                    id="namaproduk"
                    autoComplete
                    disableClearable
                    options={daftarProduk}
                    getOptionLabel={(option: NamaProdukType) => option.nama}
                    value={namaproduk}
                    onChange={(event: any, newValue: string | null) => {
                      setNamaProduk(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nama produk" 
                        margin="dense"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Autocomplete
                    id="tipeproduk"
                    autoComplete
                    disableClearable
                    options={tipeProduk}
                    getOptionLabel={(option: TipeProdukType) => option.nama}
                    value={tipeproduk}
                    onChange={(event: any, newValue: string | null) => {
                      setTipeProduk(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tipe Produk"
                        margin="dense"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Segment"
                    margin="dense"
                    name="namaSegmen"
                    required={true}
                    helperText={'Segmen tidak boleh kosong'}
                    error={values.namaSegmen === ''}
                    type="text" 
                    value={values.namaSegmen}
                    onChange={handleChange}
                    variant="outlined"/>
                </Grid>
                <Grid item md={12} xs={12} className={classes.dateLabel}>
                  <Divider />
                  <h3>Penghasilan</h3>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputMask
                    mask="9 999 999"
                    value={values.penghasilanDari}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Dari"
                      margin="dense"
                      name="penghasilanDari"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputMask
                    mask="9 999 999"
                    value={values.penghasilanSampai}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Sampai"
                      margin="dense"
                      name="penghasilanSampai"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputMask
                    mask="9 999 999 999"
                    value={values.plafon}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Plafon"
                      margin="dense"
                      name="plafon"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputMask
                    mask="99" 
                    value={values.sukubunga}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Suku Bunga"
                      margin="dense"
                      name="sukubunga"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputMask
                    mask="99"
                    value={values.tenor}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Tenor"
                      margin="dense"
                      name="tenor"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
              </Grid>
            </CardContent>
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
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={daftarProduk.map((p) => p.nama)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nama Produk"
                      margin="dense"
                      variant="outlined"
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={tipeProduk.map((t) => t.tipe)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nama Tipe"
                      margin="dense"
                      variant="outlined"
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
              </Grid>
            </Grid>
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
