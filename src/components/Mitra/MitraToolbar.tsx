import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { SearchInputCustom } from '../General';
import { AppState } from '../../redux/reducers';

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Paper from '@material-ui/core/Paper';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import Select from '@material-ui/core/Select';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SweetAlert from 'react-bootstrap-sweetalert';
import CloseIcon from '@material-ui/icons/Close';
import { NumberFormatHelper } from '../../helpers/NumberFormatHelper';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  CardContent,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { MitraData, MitraDataFilter, DaftarMitra, MitraDataListState } from '../../interfaces/MitraData';
import { addMitraData, searchMitraData, resetSearchMitraData, searchAdvMitraData, exportCSVMitra, exportExcelMitra } from '../../redux/actions/MitraDataAction';
import { colors } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';

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
    margin: theme.spacing(1),
    backgroundColor: '#4a9667',
    '&:hover': {
        backgroundColor: '#38664a',
    },
  },
  advanceSearch: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: '#4a9667',
    '&:hover': {
        backgroundColor: '#38664a',
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
  dialogTitleSection: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogContent: {
    marginTop: theme.spacing(-2)
  },
  dateLabel: {
    marginBottom: theme.spacing(-6)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
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


const daftarMitra = [
  { id:"gt754y5f-wwuwf-4849-b433-88y2ea9122", namaMitra: 'Semua Mitra'},
  { id:"ac954e5f-b55f-4849-b614-97e2ea91cbed", namaMitra: 'Bank Negara Indonesia - BNI'},
  { id:"b76067a8-3e35-4ddd-8282-7d662f20469d", namaMitra: 'Bank Central Asia - BCA'},
  { id:"1e90f800-48f5-4086-a74b-dcddd92b2a6f", namaMitra: 'Bank DKI'},
  { id:"6f36868a-a9f9-43ea-aef0-c177ddb52286", namaMitra: 'Bank OCBC NISP'},
  { id:"87e9d04e-2a31-4cea-b66d-9923407de6e6", namaMitra: 'Bank Tabungan Negara - BTN'},
  { id:"6ee9a834-a9a9-4d2a-95e0-4dc780bdf020", namaMitra: 'TEST_MITRA1'},
  { id:"8637de20-def8-4e98-9401-1f38a354264b", namaMitra: 'TEST_MITRA2'},
  { id:"1ac52c32-9557-437d-9f3d-a7adcd683e70", namaMitra: 'TEST_MITRA3'},
  { id:"0d7050bf-faec-44c5-9fbb-48e824baa2ec", namaMitra: 'TEST_MITRA4'},
];

export function MitraToolbar(props) {
  const defaultValues: MitraData = {
    namaMitra: '',
    tanggalMulaiPKS: '',
    tanggalAkhirPKS: '',
    tanggalMulaiLimit: '',
    tanggalAkhirLimit: '',
    targetUnit: 0,
    targetNominal: 0,
    maksimalLimit: 0,
  };

  const filterValues: MitraDataFilter = {
    namaMitrafilter: '',
    tanggalMulaiPKSfilter: '',
    tanggalAkhirPKSfilter: '',
    tanggalMulaiLimitfilter: '',
    tanggalAkhirLimitfilter: '',
    targetUnitfilter: '',
    targetNominalfilter: '',
    maksimalLimitfilter: '',
  };

  const dispatch = useDispatch();
  const { className, ...rest } = props;
  const mitraDataState: MitraDataListState = useSelector((state: AppState) => state.mitraData);
  const [openForm, setOpenForm] = useState(false);
  const [openAdvanceSearch, setOpenAdvanceSearch] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [filterForm, setFilterForm] = useState(false);

  const [pksStartDate, setPksStartDate] = React.useState<Date | null>(
    new Date(),
  );
  const handlePksStartDateChange = (date: Date | null) => {
    setPksStartDate(date);
  };
  const [pksStartDateFilter, setPksStartDateFilter] = React.useState<Date | null>(
    new Date(),
  );
  const handlePksStartDateChangeFilter = (date: Date | null) => {
    setPksStartDateFilter(date);
  };
  const [pksEndDate, setPksEndDate] = React.useState<Date | null>(
    new Date(),
  );
  const handlePksEndDateChange = (date: Date | null) => {
    setPksEndDate(date);
  };
  const [pksEndDateFilter, setPksEndDateFilter] = React.useState<Date | null>(
    new Date(),
  );
  const handlePksEndDateChangeFilter = (date: Date | null) => {
    setPksEndDateFilter(date);
  };
  const [limitStartDate, setLimitStartDate] = React.useState<Date | null>(
    new Date(),
  );
  const handleLimitStartDateChange = (date: Date | null) => {
    setLimitStartDate(date);
  };
  const [limitStartDateFilter, setLimitStartDateFilter] = React.useState<Date | null>(
    new Date(),
  );
  const handleLimitStartDateChangeFilter = (date: Date | null) => {
    setLimitStartDateFilter(date);
  };
  const [limitEndDate, setLimitEndDate] = React.useState<Date | null>(
    new Date(),
  );
  const handleLimitEndDateChange = (date: Date | null) => {
    setLimitEndDate(date);
  };
  const [limitEndDateFilter, setLimitEndDateFilter] = React.useState<Date | null>(
    new Date(),
  );
  const handleLimitEndDateChangeFilter = (date: Date | null) => {
    setLimitEndDateFilter(date);
  };

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

  const closeFilterForm = () => {
    setFilterForm(false);
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

  const [namamitra, setNamaMitra] = React.useState<any | null>(daftarMitra[0]);
  const [values, setValues] = useState(defaultValues);
  const [filternamamitra, setFilterNamaMitra] = React.useState<any | null>();
  const [filterVal, setFilterVal] = useState(filterValues);

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

  const handleSearch = event => {
    dispatch(searchMitraData(event.target.value))
  }

  const searchAdvanceMitraData = () => {
    filterVal.namaMitrafilter = filternamamitra.namaMitra;
    filterVal.targetUnitfilter = parseInt(filterVal.targetUnitfilter.toString().split(' '). join(''));
    filterVal.targetNominalfilter = parseInt(filterVal.targetNominalfilter.toString().split(' '). join(''));
    filterVal.maksimalLimitfilter = parseInt(filterVal.maksimalLimitfilter.toString().split(' '). join(''));
    try {
      setLoading(true);
      filterVal.targetUnitfilter === 0 ? filterVal.targetUnitfilter = '' : filterVal.targetUnitfilter;
      filterVal.targetNominalfilter === 0 ? filterVal.targetNominalfilter = '' : filterVal.targetNominalfilter;
      filterVal.maksimalLimitfilter === 0 ? filterVal.maksimalLimitfilter = '' : filterVal.maksimalLimitfilter;
      setTimeout(() => {
        dispatch(searchAdvMitraData(filterVal));
        if(mitraDataState.response === 400 || mitraDataState.response === 500) {
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

  const exportCSV = () => {
    dispatch(exportCSVMitra(''))
  }

  const exportExcel = () => {
    dispatch(exportExcelMitra(''))
  }

  const addMitra = () => {
    values.namaMitra = namamitra.namaMitra;
    values.tanggalMulaiPKS = formatDate(pksStartDate);
    values.tanggalAkhirPKS = formatDate(pksEndDate)
    values.tanggalMulaiLimit = formatDate(limitStartDate);
    values.tanggalAkhirLimit = formatDate(limitEndDate);
    values.targetUnit = parseInt(values.targetUnit.toString().split(' '). join(''));
    values.targetNominal = parseInt(values.targetNominal.toString().split(' '). join(''));
    values.maksimalLimit = parseInt(values.maksimalLimit.toString().split(' '). join(''));
    try {
      setLoading(true);
      setTimeout(() => {
        dispatch(addMitraData(values));
        if(mitraDataState.response === 400 || mitraDataState.response === 500) {
          setErrorAlert(true);
          setLoading(false)
        } else {
          values.namaMitra =  '';
          values.targetUnit =  0;
          values.targetNominal =  0;
          values.maksimalLimit =  0;
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
        Data Mitra berhasil ditambahkan!
      </SweetAlert>
      <div className={classes.row}>
        <Typography variant="h2">Master Data Mitra</Typography>
      </div>
      <div className={classes.row}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" href="/" onClick={() => {}}>
            Pemanfaatan Dana
          </Link>
          <Link color="inherit" href="/" onClick={() => {}}>
            Master Data
          </Link>
          <Typography color="textPrimary">Mitra</Typography>
        </Breadcrumbs>
      </div>
      <Divider className={classes.divider}/>
      <div className={classes.advancedSearchRow}>
        <Collapse in={filterForm}>
          <Paper className={classes.searchPaper} elevation={3}>
            <div className={classes.filterTitle}>
              <Typography variant="h4">Filter Data Mitra</Typography>
              <Divider />
            </div>
            <form autoComplete="off" noValidate>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Autocomplete
                        id="filternamamitra"
                        autoComplete
                        disableClearable
                        options={daftarMitra}
                        getOptionLabel={(option: DaftarMitra) => option.namaMitra}
                        value={filternamamitra}
                        onChange={(event: any, newValue: string | null) => {
                          setFilterNamaMitra(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nama Mitra"
                            margin="dense"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                          />
                        )}
                      />
                  </Grid>
                  <Grid item xs={3}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="pksStartDateFilter"
                        label="Dari"
                        value={pksStartDateFilter}
                        onChange={handlePksStartDateChangeFilter}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}/>
                  </Grid>
                  <Grid item xs={3}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="pksEndDateFilter"
                        label="Sampai"
                        value={pksEndDateFilter}
                        onChange={handlePksEndDateChangeFilter}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Target Unit"
                      value={filterVal.targetUnitfilter}
                      onChange={handleChangeFilter}
                      name="targetUnitfilter"
                      id="targetUnitfilter" 
                      required={true}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      InputProps={{
                        inputComponent: NumberFormatHelper as any,
                        inputProps: { 
                          suffix: ' unit', 
                          tenormax: 999999999,
                          thousandSeparator: '.',
                          decimalSeparator: ','
                        }
                      }}/>
                  </Grid>
                  <Grid item xs={3}>
                    <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="limitStartDateFilter"
                        label="Dari"
                        value={limitStartDateFilter}
                        onChange={handleLimitStartDateChangeFilter}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        variant="inline"/>
                  </Grid>
                  <Grid item xs={3}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="limitEndDateFilter"
                        label="Sampai"
                        value={limitEndDateFilter}
                        onChange={handleLimitEndDateChangeFilter}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Target Nominal"
                      value={filterVal.targetNominalfilter}
                      onChange={handleChangeFilter}
                      name="targetNominalfilter"
                      id="targetNominalfilter" 
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
                          decimalSeparator: ','
                        }
                      }}/>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Maksimal Limit"
                      value={filterVal.maksimalLimitfilter}
                      onChange={handleChangeFilter}
                      name="maksimalLimitfilter"
                      id="maksimalLimitfilter" 
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
                          decimalSeparator: ','}
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
                        onClick={searchAdvanceMitraData}>
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
          dispatchFunc={resetSearchMitraData('')}
          placeholder="Cari Mitra"/>
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
          <a style={{color: "white", textDecoration: "none"}}>Tambah Mitra</a>
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={closeFormModal}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="tambahdatamitra">
          <MuiDialogTitle disableTypography className={classes.dialogTitleSection}>
            <Typography variant="h5">Tambah Data Mitra</Typography>
            {openForm ? (
              <IconButton aria-label="close" className={classes.closeButton} onClick={closeFormModal}>
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
                      <Autocomplete
                        id="namamitra"
                        autoComplete
                        disableClearable
                        options={daftarMitra}
                        getOptionLabel={(option: DaftarMitra) => option.namaMitra}
                        value={namamitra}
                        onChange={(event: any, newValue: string | null) => {
                          setNamaMitra(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nama Mitra"
                            margin="dense"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                          />
                        )}
                      />
                    </Grid>
                      <Grid item md={12} xs={12} className={classes.dateLabel}>
                        <Divider />
                        <h3>Tanggal PKS</h3>
                      </Grid>
                      <Grid item md={6} xs={12}>
                      <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="pksStartDate"
                        label="Dari"
                        value={pksStartDate}
                        onChange={handlePksStartDateChange}
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
                        id="pksEndDate"
                        label="Sampai"
                        value={pksEndDate}
                        minDate={pksStartDate}
                        minDateMessage={'Tanggal harus setelah tanggal mulai PKS'}
                        onChange={handlePksEndDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12} className={classes.dateLabel}>
                        <Divider />
                        <h3>Tanggal Limit</h3>
                      </Grid>
                      <Grid item md={6} xs={12}>
                      <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="limitStartDate"
                        label="Dari"
                        value={limitStartDate}
                        onChange={handleLimitStartDateChange}
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
                        id="limitEndDate"
                        label="Sampai"
                        value={limitEndDate}
                        minDate={limitStartDate}
                        minDateMessage={'Tanggal harus setelah tanggal mulai Limit'}
                        onChange={handleLimitEndDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          label="Target Unit"
                          value={values.targetUnit}
                          onChange={handleChange}
                          name="targetUnit"
                          id="targetUnit" 
                          required={true}
                          variant="outlined"
                          margin="dense"
                          fullWidth
                          InputProps={{
                            inputComponent: NumberFormatHelper as any,
                            inputProps: { 
                              suffix: ' unit', 
                              tenormax: 999999999,
                              thousandSeparator: '.',
                              decimalSeparator: ','
                            }
                          }} />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          label="Target Nominal"
                          value={values.targetNominal}
                          onChange={handleChange}
                          name="targetNominal"
                          id="targetNominal" 
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
                              decimalSeparator: ','
                            }
                          }} />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          label="Maksimal Limit"
                          value={values.maksimalLimit}
                          onChange={handleChange}
                          name="maksimalLimit"
                          id="maksimalLimit" 
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
                              decimalSeparator: ','}
                          }} />
                      </Grid>
                      <Grid item md={12} xs={12}>
                      {errorAlert 
                        ? <Alert severity="error">
                            <AlertTitle>Add Mitra Data Failed</AlertTitle>
                            {mitraDataState.error.msg}
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
                values.targetUnit === 0 || 
                values.targetNominal === 0 || 
                values.maksimalLimit === 0 || 
                loading}
              startIcon={<SaveRoundedIcon />}
              onClick={addMitra}>
              Simpan Data
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

MitraToolbar.propTypes = {
  className: PropTypes.string
};

export default MitraToolbar;
