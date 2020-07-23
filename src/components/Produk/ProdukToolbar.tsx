import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../redux/reducers';
import { SearchInputCustom } from '../General';
import { NumberFormatHelper } from '../../helpers/NumberFormatHelper';
import { ProdukData, ProdukDataFilter, ProdukDataListState, FiturProduk, TipeProduk } from '../../interfaces/ProdukData';
import { addProdukData, searchProdukData, searchAdvProdukData, resetSearchProdukData, exportCSVProduk, exportExcelProduk } from '../../redux/actions/ProdukDataAction';

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Collapse from '@material-ui/core/Collapse';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  CardContent,
  Divider,
  Grid,
  TextField,
  Button,
  colors
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';
import usePrevious from '../../helpers/usePrevious';


const useStyles = makeStyles((theme:Theme) => ({
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
  searchInput: {
    marginRight: theme.spacing(1)
  },
  buttons: {
    margin: theme.spacing(1),
    backgroundColor: '#4a9667',
    '&:hover': {
        backgroundColor: '#38664a',
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  produkAdvanceSearch: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: '#4a9667',
    '&:hover': {
        backgroundColor: '#38664a',
    },
  },
  closeButtonProduk: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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
  dialogTitleSectionProduk: {
    margin: 0,
    padding: theme.spacing(2),
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
  advancedSearchRow: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  searchPaper: {
    padding: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: colors.blueGrey[600],
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  advanceSearch: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: '#4a9667',
    '&:hover': {
        backgroundColor: '#38664a',
    },
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    backgroundColor: '#cee0d4'
  },
  filterTitle: {
    marginBottom: theme.spacing(2)
  }
}));


export function ProdukToolbar(props) {
  const defaultVal: ProdukData = {
    idFiturProduk: '',
    namaFiturProduk:'',
    idTipeProduk: '',
    namaTipeProduk:'',
    namaSegmen: null,
    penghasilanDari: 0,
    penghasilanSampai: 0,
    plafon:0,
    sukuBunga:0,
    tenor:0
  };

  const filterValues: ProdukDataFilter = {
    idFiturProdukfilter: '',
    namaFiturProdukfilter:'',
    idTipeProdukfilter: '',
    namaTipeProdukfilter:'',
    namaSegmenfilter: '',
    penghasilanDarifilter: 0,
    penghasilanSampaifilter: 0,
    plafonfilter:0,
    sukuBungafilter:0,
    tenorfilter:0
  };

  const dispatch = useDispatch();
  const { className, fiturproduk, tipeproduk, ...rest } = props;
  const produkDataState: ProdukDataListState = useSelector((state: AppState) => state.produkData);
  const prevResponse = usePrevious(produkDataState.action);
  useEffect(() => {
    if(prevResponse !== undefined && prevResponse !== produkDataState.action) {
      if(produkDataState.action === 'ADD_PRODUK_ERROR') {
        setErrorAlert(true);
        setLoading(false)
      } else if(produkDataState.action === 'ADD_PRODUK_SUCCESS') {
        values.idFiturProduk =  '';
        values.namaFiturProduk = '';
        values.idTipeProduk =  '';
        values.namaTipeProduk = '';
        values.namaSegmen =  null;
        values.penghasilanDari =  0;
        values.penghasilanSampai =  0;
        values.plafon = 0;
        values.sukuBunga = 0;
        values.tenor = 0;
        setErrorAlert(false);
        setOpenForm(false);
        setLoading(false);
        setSuccessAlert(true);
      }
    } 
  }, [produkDataState.action]);
  const [openForm, setOpenForm] = React.useState(false);
  const [openAdvanceSearch, setOpenAdvanceSearch] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [namaproduk, setNamaProduk] = useState(null);
  const [tipeProduk, setTipeProduk] = useState(null);
  const [namaprodukfilter, setNamaProdukFilter] = useState(null);
  const [tipeProdukfilter, setTipeProdukFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [filterForm, setFilterForm] = useState(false);
  const [filterVal, setFilterVal] = useState(filterValues);

  const openFormModal = () => {
    setLoading(false);
    setOpenForm(true);
  };

  const closeFormModal = () => {
    setOpenForm(false);
  };

  const toggleFilterForm = () => {
    setFilterForm((prev) => !prev);
  };

  const [values, setValues] = useState(defaultVal);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeFilter = event => {
    setFilterVal({
      ...filterVal,
      [event.target.name]: event.target.value
    });
  };

  const exportCSV = () => {
    dispatch(exportCSVProduk(''))
  }

  const exportExcel = () => {
    dispatch(exportExcelProduk(''))
  }

  const handleSearch = event => {
    dispatch(searchProdukData(event.target.value))
  }

  const searchAdvanceProdukData = () => {
    namaprodukfilter === null ? filterVal.idFiturProdukfilter = '' : filterVal.idFiturProdukfilter = namaprodukfilter.id;
    namaprodukfilter === null ? filterVal.namaFiturProdukfilter = '' : filterVal.namaFiturProdukfilter = namaprodukfilter.namaFiturProduk;
    tipeProdukfilter === null ? filterVal.idTipeProdukfilter = '' : filterVal.idTipeProdukfilter = tipeProdukfilter.id;
    tipeProdukfilter === null ? filterVal.namaTipeProdukfilter = '' : filterVal.namaTipeProdukfilter = tipeProdukfilter.namaTipeProduk;
    try {
      setLoading(true);
      
      filterVal.penghasilanDarifilter === 0 ? filterVal.penghasilanDarifilter = '' : filterVal.penghasilanDarifilter;
      filterVal.penghasilanSampaifilter === 0 ? filterVal.penghasilanSampaifilter = '' : filterVal.penghasilanSampaifilter;
      filterVal.plafonfilter === 0 ? filterVal.plafonfilter = '' : filterVal.plafonfilter;
      filterVal.sukuBungafilter === 0 ? filterVal.sukuBungafilter = '' : filterVal.sukuBungafilter;
      filterVal.tenorfilter === 0 ? filterVal.tenorfilter = '' : filterVal.tenorfilter;

      setTimeout(() => {
        dispatch(searchAdvProdukData(filterVal));
        if(produkDataState.response === 400 || produkDataState.response === 500) {
          setErrorAlert(true);
          setLoading(false)
        } else {
          setErrorAlert(false);
          setOpenForm(false);
          setLoading(false);
        }
      }, 2000);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
    }
  }

  const addProduk = () => {
    values.idFiturProduk = namaproduk.id
    values.namaFiturProduk = namaproduk.namaFiturProduk;
    values.idTipeProduk = tipeProduk.id;
    values.namaTipeProduk = tipeProduk.namaTipeProduk;
    values.penghasilanDari = parseInt(values.penghasilanDari.toString().split(' ').join(''));
    values.penghasilanSampai = parseInt(values.penghasilanSampai.toString().split(' ').join(''));
    values.plafon = parseInt(values.plafon.toString().split(' ').join(''));
    values.sukuBunga = parseInt(values.sukuBunga.toString().split(' ').join(''));
    values.tenor = parseInt(values.tenor.toString().split(' ').join(''));
    try {
      setLoading(true);
      dispatch(addProdukData(values));
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <SweetAlert 
        success 
        title="Data Added!" 
        customButtons={
          <Fragment>
            <Button
                color="primary"
                variant="contained"
                className={classes.buttons}
                onClick={() => setSuccessAlert(false)}>
              <a style={{color: "white", textDecoration: "none"}}>OK</a>
            </Button>
          </Fragment>
        } 
        show={successAlert} 
        onConfirm={() => setSuccessAlert(false)}>
        Data pembiayaan berhasil ditambahkan!
      </SweetAlert>
      <div className={classes.row}>
        <Typography variant="h2">Master Data Pembiayaan</Typography>
      </div>
      <div className={classes.row}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={() => {}}>
            Pemanfaatan Dana
          </Link>
          <Link color="inherit" href="/" onClick={() => {}}>
            Master Data
          </Link>
          <Typography color="textPrimary">Pembiayaan</Typography>
        </Breadcrumbs>
      </div>
      <Divider className={classes.divider}/>
      <div className={classes.advancedSearchRow}>
        <Collapse in={filterForm}>
          <Paper className={classes.searchPaper} elevation={3}>
            <div className={classes.filterTitle}>
              <Typography variant="h4">Filter Data Pembiayaan</Typography>
              <Divider />
            </div>
            <form autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Autocomplete
                    id="filternamaproduk"
                    autoComplete
                    disableClearable
                    options={fiturproduk}
                    getOptionLabel={(option: FiturProduk) => option.namaFiturProduk}
                    value={namaprodukfilter}
                    onChange={(event: any, newValue: string | null) => {
                      setNamaProdukFilter(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Jenis Pembiayaan" 
                        margin="dense"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    id="tipeproduk"
                    autoComplete
                    disableClearable
                    options={tipeproduk}
                    getOptionLabel={(option: TipeProduk) => option.namaTipeProduk}
                    value={tipeProdukfilter}
                    onChange={(event: any, newValue: string | null) => {
                      setTipeProdukFilter(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Bentuk Pembiayaan"
                        margin="dense"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                  fullWidth
                  label="Segment"
                  margin="dense"
                  name="namaSegmenfilter"
                  type="text" 
                  value={filterVal.namaSegmenfilter || ''}
                  onChange={handleChangeFilter}
                  variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                  label="Dari"
                  value={filterVal.penghasilanDarifilter}
                  onChange={handleChangeFilter}
                  name="penghasilanDarifilter"
                  id="penghasilanDarifilter" 
                  required={true}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  InputProps={{
                    inputComponent: NumberFormatHelper as any,
                    inputProps: { 
                      prefix: 'Rp. ', 
                      tenormax: 999999999,
                      thousandSeparator: '.', 
                      decimalSeparator: ',', 
                      decimalScale:2}
                  }} />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Sampai"
                    margin="dense"
                    name="penghasilanSampaifilter"
                    required={true}
                    value={filterVal.penghasilanSampaifilter}
                    onChange={handleChangeFilter}
                    variant="outlined"
                    InputProps={{
                      inputComponent: NumberFormatHelper as any,
                      inputProps: { 
                        prefix: 'Rp. ', 
                        tenormax: 999999999,
                        thousandSeparator: '.', 
                        decimalSeparator: ',',
                        decimalScale:2}
                    }} />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    label="Plafon"
                    value={filterVal.plafonfilter}
                    onChange={handleChangeFilter}
                    name="plafonfilter"
                    id="plafonfilter" 
                    required={true}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    InputProps={{
                      inputComponent: NumberFormatHelper as any,
                      inputProps: { 
                        prefix: 'Rp. ', 
                        tenormax: 9999999999,
                        thousandSeparator: '.', 
                        decimalSeparator: ',',
                        decimalScale:2}
                    }} />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    label="Suku Bunga"
                    value={filterVal.sukuBungafilter}
                    onChange={handleChangeFilter}
                    name="sukuBungafilter"
                    id="sukuBungafilter" 
                    required={true}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    InputProps={{
                      inputComponent: NumberFormatHelper as any,
                      inputProps: { 
                        suffix: ' %', 
                        tenormax: 99,
                        thousandSeparator: '.', 
                        decimalSeparator: ',', 
                        decimalScale:3}
                    }} />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    label="Tenor"
                    value={filterVal.tenorfilter}
                    onChange={handleChangeFilter}
                    name="tenorfilter"
                    id="tenorfilter" 
                    required={true}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    InputProps={{
                      inputComponent: NumberFormatHelper as any,
                      inputProps: { 
                        suffix: ' thn',
                        tenormax: 99,
                        thousandSeparator: '.', 
                        decimalSeparator: ',', 
                        decimalScale:3}
                    }} />
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.wrapper}>
                    <Button
                      size="medium"
                      disableElevation
                      variant="contained"
                      disabled={loading}
                      className={classes.advanceSearch}
                      onClick={searchAdvanceProdukData}>
                      <a style={{color: "white", textDecoration: "none"}}>Cari</a>
                      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Button>
                    <Button
                      size="medium"
                      disableElevation
                      variant="contained"
                      disabled={loading}
                      className={classes.advanceSearch}
                      onClick={toggleFilterForm}>
                      <a style={{color: "white", textDecoration: "none"}}>Tutup</a>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Collapse>
      </div>
      <div className={classes.row}>
        <SearchInputCustom
          className={classes.searchInput}
          onKeyUp={handleSearch}
          dispatchFunc={resetSearchProdukData('')}
          placeholder="Cari Pembiayaan"/>
        <span className={classes.spacer} />
        <Button
          variant="contained" 
          disableElevation
          className={classes.produkAdvanceSearch}
          startIcon={<PageviewRoundedIcon />}
          onClick={toggleFilterForm}>
          <a style={{color: "white", textDecoration: "none"}}>Advanced Search</a>
        </Button>
        <Button
          color="primary"
          disableElevation
          variant="contained"
          className={classes.buttons}
          onClick={exportCSV}
          startIcon={<PublishRoundedIcon />}>
          <a style={{color: "white", textDecoration: "none"}}>Export to CSV</a>
        </Button>
        <Button
          color="primary"
          disableElevation
          variant="contained"
          className={classes.buttons}
          onClick={exportExcel}
          startIcon={<PublishRoundedIcon />}>
          <a style={{color: "white", textDecoration: "none"}}>Export to Excel</a>
        </Button>
        <Button
          color="secondary"
          disableElevation
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
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="tambahdataProduk">
          <MuiDialogTitle disableTypography className={classes.dialogTitleSectionProduk}>
            <Typography variant="h5">Tambah Data Pembiayaan</Typography>
            {openForm ? (
              <IconButton aria-label="close" className={classes.closeButtonProduk} onClick={closeFormModal}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </MuiDialogTitle>
        </DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
           <form autoComplete="off" noValidate>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <Autocomplete
                    id="namaproduk"
                    autoComplete
                    disableClearable
                    options={fiturproduk}
                    getOptionLabel={(option: FiturProduk) => option.namaFiturProduk}
                    value={namaproduk}
                    onChange={(event: any, newValue: string | null) => {
                      setNamaProduk(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Jenis Pembiayaan" 
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
                    options={tipeproduk}
                    getOptionLabel={(option: TipeProduk) => option.namaTipeProduk}
                    value={tipeProduk}
                    onChange={(event: any, newValue: string | null) => {
                      setTipeProduk(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Bentuk Pembiayaan"
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
                    error={values.namaSegmen === ''}
                    helperText={
                      values.namaSegmen === '' ? 'Nama segment tidak boleh kosong' : null
                    }
                    type="text" 
                    value={values.namaSegmen || ''}
                    onChange={handleChange}
                    variant="outlined"/>
                </Grid>
                <Grid item md={12} xs={12} className={classes.dateLabel}>
                  <Divider />
                  <h3>Penghasilan</h3>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    label="Dari"
                    value={values.penghasilanDari}
                    onChange={handleChange}
                    name="penghasilanDari"
                    id="penghasilanDari" 
                    required={true}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    InputProps={{
                      inputComponent: NumberFormatHelper as any,
                      inputProps: { 
                        prefix: 'Rp. ', 
                        tenormax: 999999999,
                        thousandSeparator: '.', 
                        decimalSeparator: ',', 
                        decimalScale:2}
                    }} />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Sampai"
                    margin="dense"
                    name="penghasilanSampai"
                    required={true}
                    value={values.penghasilanSampai}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      inputComponent: NumberFormatHelper as any,
                      inputProps: { 
                        prefix: 'Rp. ', 
                        tenormax: 999999999,
                        thousandSeparator: '.', 
                        decimalSeparator: ',',
                        decimalScale:2}
                    }} />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    label="Plafon"
                    value={values.plafon}
                    onChange={handleChange}
                    name="plafon"
                    id="plafon" 
                    required={true}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    InputProps={{
                      inputComponent: NumberFormatHelper as any,
                      inputProps: { 
                        prefix: 'Rp. ', 
                        tenormax: 9999999999,
                        thousandSeparator: '.', 
                        decimalSeparator: ',',
                        decimalScale:2}
                    }} />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    label="Suku Bunga"
                    value={values.sukuBunga}
                    onChange={handleChange}
                    name="sukuBunga"
                    id="sukuBunga" 
                    required={true}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    InputProps={{
                      inputComponent: NumberFormatHelper as any,
                      inputProps: { 
                        suffix: ' %', 
                        tenormax: 99,
                        thousandSeparator: '.', 
                        decimalSeparator: ',', 
                        decimalScale:3}
                    }} />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    label="Tenor"
                    value={values.tenor}
                    onChange={handleChange}
                    name="tenor"
                    id="tenor" 
                    required={true}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    InputProps={{
                      inputComponent: NumberFormatHelper as any,
                      inputProps: { 
                        suffix: ' thn',
                        tenormax: 99,
                        thousandSeparator: '.', 
                        decimalSeparator: ',', 
                        decimalScale:3}
                    }} />
                </Grid>
                <Grid item md={12} xs={12}>
                {errorAlert 
                  ? <Alert severity="error">
                      <AlertTitle>Add Produk Data Failed</AlertTitle>
                      {produkDataState.error.msg}
                    </Alert> 
                  : null}
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <div className={classes.wrapper}>
            <Button
              color="secondary"
              variant="contained"
              disabled={
                values.namaSegmen === '' || 
                values.namaSegmen === null || 
                values.penghasilanDari === 0 || 
                values.penghasilanSampai === 0 || 
                values.plafon === 0 || 
                values.sukuBunga === 0 ||
                values.tenor === 0 || 
                loading}
              startIcon={<SaveRoundedIcon />}
              onClick={addProduk}>
              Simpan Data
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProdukToolbar;
