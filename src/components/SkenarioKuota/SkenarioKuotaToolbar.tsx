import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../redux/reducers';
import { SearchInputCustom } from '../General';
import { NumberFormatHelper } from '../../helpers/NumberFormatHelper';
import { SkenarioKuota, SkenarioKuotaFilter, SkenarioKuotaListState } from '../../interfaces/SkenarioKuota';
import { 
  addSkenarioKuota, 
  searchSkenarioKuota, 
  resetSearchSkenarioKuota, 
  searchAdvSkenarioKuota, 
  exportCSVSkenarioKuota, 
  exportExcelSkenarioKuota 
} from '../../redux/actions/SkenarioKuotaAction';

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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
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
  skenarioAdvancedSearch: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: '#4a9667',
    '&:hover': {
        backgroundColor: '#38664a',
    },
  },
  closeButtonSkenario: {
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
  dialogTitleSectionSkenario: {
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


export function SkenarioKuotaToolbar(props) {
  const defaultVal: SkenarioKuota = {
    namaSkenario: '',
    kuota: 0,
    berlakuDari: '',
    berlakuSampai:'',
  };

  const filterValues: SkenarioKuotaFilter = {
    namaSkenariofilter: '',
    kuotafilter: 0,
    berlakuDarifilter: '',
    berlakuSampaifilter: '',
  };

  const dispatch = useDispatch();
  const { className, ...rest } = props;
  const skenarioKuotaState: SkenarioKuotaListState = useSelector((state: AppState) => state.skenarioKuota);
  const prevResponse = usePrevious(skenarioKuotaState.action);

  useEffect(() => {
    if(prevResponse !== undefined && prevResponse !== skenarioKuotaState.response) {
      if(skenarioKuotaState.action === 'ADD_SKENARIOKUOTA_ERROR') {
        setErrorAlert(true);
        setLoading(false)
      } else if(skenarioKuotaState.action === 'ADD_SKENARIOKUOTA_SUCCESS') {
        values.namaSkenario =  '';
        values.kuota =  0;
        values.berlakuDari =  '';
        values.berlakuSampai =  '';
        setErrorAlert(false);
        setOpenForm(false);
        setLoading(false);
        setSuccessAlert(true);
      }
    } 
  }, [skenarioKuotaState.response]);
  
  const [openForm, setOpenForm] = React.useState(false);
  const [openAdvanceSearch, setOpenAdvanceSearch] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [berlakuDariDate, setBerlakuDariDate] = React.useState<Date | null>(
    new Date(),
  );
  const handleBerlakuDariDateChange = (date: Date | null) => {
    setBerlakuDariDate(date);
  };
  const [berlakuSampaiDate, setBerlakuSampaiDate] = React.useState<Date | null>(
    new Date(),
  );
  const handleBerlakuSampaiDateChange = (date: Date | null) => {
    setBerlakuSampaiDate(date);
  };
  const [berlakuSampaiDateFilter, setBerlakuSampaiDateFilter] = React.useState<Date | null>(
    new Date(),
  );
  const handleBerlakuSampaiDateChangeFilter = (date: Date | null) => {
    setBerlakuSampaiDateFilter(date);
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
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

  const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

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
    dispatch(exportCSVSkenarioKuota(''))
  }

  const exportExcel = () => {
    dispatch(exportExcelSkenarioKuota(''))
  }

  const handleSearch = event => {
    dispatch(searchSkenarioKuota(event.target.value))
  }

  const searchAdvanceSkenarioKuota = () => {
    filterVal.berlakuSampaifilter = formatDate(berlakuSampaiDateFilter);
    console.log(`filterVal: ${JSON.stringify(filterVal)}`);
    try {
      setLoading(true);
      setTimeout(() => {
        dispatch(searchAdvSkenarioKuota(filterVal));
        if(skenarioKuotaState.response === 400 || skenarioKuotaState.response === 500) {
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

  const addSkenario = () => {
    values.berlakuDari = formatDate(berlakuDariDate);
    values.berlakuSampai = formatDate(berlakuSampaiDate);
    values.kuota = values.kuota;
    try {
      setLoading(true);
      setTimeout(() => {
        dispatch(addSkenarioKuota(values));
        if(skenarioKuotaState.response === 400 || skenarioKuotaState.response === 500 || skenarioKuotaState.response === 405) {
          setErrorAlert(true);
          setLoading(false);
        } else {
          values.namaSkenario = '';
          values.kuota = 0;
          setErrorAlert(false);
          setOpenForm(false);
          setLoading(false);
          setSuccessAlert(true);
        }
      }, 2000);
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
        Data skenario kuota berhasil ditambahkan!
      </SweetAlert>
      <div className={classes.row}>
        <Typography variant="h2">Skenario Kuota</Typography>
      </div>
      <div className={classes.row}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={() => {}}>
            Skenario
          </Link>
          <Link color="inherit" href="/getting-started/installation/" onClick={() => {}}>
            <Typography color="textPrimary">Skenario Kuota</Typography>
          </Link>
        </Breadcrumbs>
      </div>
      <Divider className={classes.divider}/>
      <div className={classes.advancedSearchRow}>
        <Collapse in={filterForm}>
          <Paper className={classes.searchPaper} elevation={3}>
            <div className={classes.filterTitle}>
              <Typography variant="h4">Filter Skenario Kuota</Typography>
              <Divider />
            </div>
            <form autoComplete="off" noValidate>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <TextField
                      label="Nama Skenario"
                      value={filterVal.namaSkenariofilter}
                      onChange={handleChangeFilter}
                      name="namaSkenariofilter"
                      id="namaSkenariofilter" 
                      required={true}
                      variant="outlined"
                      margin="dense"
                      fullWidth/>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="dense"
                        id="berlakuSampaiDateFilter"
                        label="Tanggal Berlaku"
                        value={berlakuSampaiDateFilter}
                        onChange={handleBerlakuSampaiDateChangeFilter}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}/>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <div className={classes.wrapper}>
                      <Button
                        size="medium"
                        disableElevation
                        variant="contained"
                        disabled={loading}
                        className={classes.advanceSearch}
                        onClick={searchAdvanceSkenarioKuota}>
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
              </MuiPickersUtilsProvider>
            </form>
          </Paper>
        </Collapse>
      </div>
      <div className={classes.row}>
        <SearchInputCustom
          className={classes.searchInput}
          onKeyUp={handleSearch}
          dispatchFunc={resetSearchSkenarioKuota('')}
          placeholder="Cari Skenario"/>
        <span className={classes.spacer} />
        <Button
          size="small"
          disableElevation
          variant="contained"
          className={classes.advanceSearch}
          startIcon={<PageviewRoundedIcon />}
          onClick={toggleFilterForm}>
          <a style={{color: "white", textDecoration: "none"}}>Advanced Search</a>
        </Button>
        <Button
          size="small"
          disableElevation
          variant="contained"
          className={classes.buttons}
          onClick={exportCSV}
          startIcon={<PublishRoundedIcon style={{ color: '#FFFFFF' }}/>}>
          <a style={{color: "white", textDecoration: "none"}}>Export to CSV</a>
        </Button>
        <Button
          size="small"
          disableElevation
          variant="contained"
          className={classes.buttons}
          onClick={exportExcel}
          startIcon={<PublishRoundedIcon style={{ color: '#FFFFFF' }}/>}>
          <a style={{color: "white", textDecoration: "none"}}>Export to Excel</a>
        </Button>
        <Button
          size="small"
          disableElevation
          variant="contained"
          className={classes.buttons}
          startIcon={<AddCircleOutlineRoundedIcon style={{ color: '#FFFFFF' }} />}
          onClick={openFormModal}>
          <a style={{color: "white", textDecoration: "none"}}>Tambah Skenario</a>
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={closeFormModal}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="tambahdataskenario">
          <MuiDialogTitle disableTypography className={classes.dialogTitleSectionSkenario}>
            <Typography variant="h5">Tambah Data Skenario</Typography>
            {openForm ? (
              <IconButton aria-label="close" className={classes.closeButtonSkenario} onClick={closeFormModal}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </MuiDialogTitle>
        </DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
           <form autoComplete="off" noValidate>
            <CardContent>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        label="Nama Skenario"
                        value={values.namaSkenario}
                        onChange={handleChange}
                        name="namaSkenario"
                        id="namaSkenario" 
                        required={true}
                        variant="outlined"
                        margin="dense"
                        fullWidth/>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        label="Kuota"
                        value={values.kuota}
                        onChange={handleChange}
                        name="kuota"
                        id="kuota" 
                        required={true}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        InputProps={{
                          inputComponent: NumberFormatHelper as any,
                          inputProps: { 
                            prefix: 'Rp. ', 
                            tenormax: 99999999999999,
                            thousandSeparator: '.',
                            decimalSeparator: ','
                          }
                        }} />
                    </Grid>
                      <Grid item md={12} xs={12} className={classes.dateLabel}>
                        <Divider />
                        <h3>Tanggal Berlaku</h3>
                      </Grid>
                      <Grid item md={6} xs={12}>
                      <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="berlakuDari"
                        label="Dari"
                        value={berlakuDariDate}
                        onChange={handleBerlakuDariDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </Grid>
                      <Grid item md={6} xs={12}>
                      <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="berlakuSampai"
                        label="Sampai"
                        value={berlakuSampaiDate}
                        minDate={berlakuDariDate}
                        minDateMessage={'Tanggal harus setelah tanggal berlaku dari'}
                        onChange={handleBerlakuSampaiDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                      {errorAlert 
                        ? <Alert severity="error">
                            <AlertTitle>Add Skenario Prioritas Failed</AlertTitle>
                            {skenarioKuotaState.error.msg}
                          </Alert> 
                        : null}
                      </Grid>
                  </Grid>
              </MuiPickersUtilsProvider>
            </CardContent>
            <Divider />
          </form>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <div className={classes.wrapper}>
            <Button
              color="secondary"
              variant="contained" 
              disabled={
                values.namaSkenario === '' || 
                values.kuota === 0 || 
                loading}
              startIcon={<SaveRoundedIcon />}
              onClick={addSkenario}>
              Simpan Data
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SkenarioKuotaToolbar.propTypes = {
  className: PropTypes.string,
};

export default SkenarioKuotaToolbar;
