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
import { MitraDataListState, MitraData } from '../../interfaces/MitraData';
import { addMitraData, getMitraData, searchMitraData, resetSearchMitraData } from '../../redux/actions/MitraDataAction';
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
    marginBottom: theme.spacing(-6)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: colors.blueGrey[600],
  },

}));

interface NamaMitraType {
  nama: string;
}

const daftarMitra = [
  { nama: 'Bank Negara Indonesia - BNI'},
  { nama: 'Bank Central Asia - BCA'},
  { nama: 'Bank DKI'},
  { nama: 'Bank OCBC NISP'},
  { nama: 'Bank Tabungan Negara - BTN'}
];

export function MitraToolbar(props) {
  const defaultValues: MitraData = {
    id: 0,
    nama: '',
    tanggalPKS: '',
    pksStartDate: '',
    pksEndDate: '',
    tanggalLimit: '',
    limitStartDate: '',
    limitEndDate: '',
    targetUnit: 0,
    targetNominal: 0,
    maxLimit: 0,
    approvalStatus: 1,
    createdAt: ''
  };

  const dispatch = useDispatch();
  const { className, ...rest } = props;
  const [openForm, setOpenForm] = React.useState(false);
  const [openAdvanceSearch, setOpenAdvanceSearch] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [pksStartDate, setPksStartDate] = React.useState<Date | null>(
    new Date(),
  );
  const handlePksStartDateChange = (date: Date | null) => {
    setPksStartDate(date);
  };
  const [pksEndDate, setPksEndDate] = React.useState<Date | null>(
    new Date(),
  );
  const handlePksEndDateChange = (date: Date | null) => {
    setPksEndDate(date);
  };
  const [limitStartDate, setLimitStartDate] = React.useState<Date | null>(
    new Date(),
  );
  const handleLimitStartDateChange = (date: Date | null) => {
    setLimitStartDate(date);
  };
  const [limitEndDate, setLimitEndDate] = React.useState<Date | null>(
    new Date(),
  );
  const handleLimitEndDateChange = (date: Date | null) => {
    setLimitEndDate(date);
  };

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

  const [namamitra, setNamaMitra] = React.useState<any | null>(daftarMitra[0]);

  const [values, setValues] = useState(defaultValues);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSearch = event => {
    dispatch(searchMitraData(event.target.value))
  }

  const addMitra = () => {
    values.nama = namamitra.nama;
    values.tanggalPKS = pksStartDate.toString();
    values.pksStartDate = pksStartDate.toString();
    values.pksEndDate = pksEndDate.toString();
    values.tanggalLimit = limitStartDate.toString();
    values.limitStartDate = limitStartDate.toString();
    values.limitEndDate = pksEndDate.toString();
    values.targetUnit = parseInt(values.targetUnit.toString().split(' '). join(''));
    values.targetNominal = parseInt(values.targetNominal.toString().split(' '). join(''));
    values.maxLimit = parseInt(values.maxLimit.toString().split(' '). join(''));
    try {
      dispatch(addMitraData(values));
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
          dispatchFunc={resetSearchMitraData('')}
          placeholder="Cari Mitra"/>
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
          <a style={{color: "white", textDecoration: "none"}}>Tambah Mitra</a>
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={closeFormModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="tambahdatamitra">Tambah Data Mitra</DialogTitle>
        <DialogContent className={classes.dialogContent}>
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
                        getOptionLabel={(option: NamaMitraType) => option.nama}
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
                        <InputMask
                          mask="999 999"
                          value={values.targetUnit}
                          onChange={handleChange}>
                          {() => <TextField
                            fullWidth
                            label="Target Unit"
                            margin="dense"
                            name="targetUnit"
                            required={true}
                            type="text"
                            variant="outlined"/>}
                        </InputMask>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <InputMask
                          mask="999 999 999 999"
                          value={values.targetNominal}
                          onChange={handleChange}>
                          {() => <TextField
                              fullWidth
                              label="Target Nominal"
                              margin="dense"
                              name="targetNominal"
                              type="text"
                              variant="outlined"/>}
                        </InputMask>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <InputMask
                          mask="999 999 999 999"
                          value={values.maxLimit}
                          onChange={handleChange}>
                          {() => <TextField
                              fullWidth
                              label="Maksimal Limit"
                              margin="dense"
                              name="maxLimit"
                              type="text"
                              variant="outlined"
                          />}
                        </InputMask>
                      </Grid>
                  </Grid>
              </MuiPickersUtilsProvider>
            </CardContent>
            <Divider />
          </form>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <Button
              color="secondary"
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              onClick={addMitra}>
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
        <DialogTitle id="alert-dialog-title">{"Cari Data Mitra"}</DialogTitle>
        <DialogContent>
          <form autoComplete="off" noValidate>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={daftarMitra.map((m) => m.nama)}
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
                <Grid item xs={6}>
                  <TextField
                      fullWidth
                      label="Target Unit"
                      margin="dense"
                      name="targetUnit"
                      onChange={handleChange}
                      type="number"
                      value={values.targetUnit}
                      variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                          fullWidth
                          label="Target Nominal"
                          margin="dense"
                          name="targetNominal"
                          onChange={handleChange}
                          type="number"
                          value={values.targetNominal}
                          variant="outlined"
                      />
                </Grid>
                <Grid item xs={6}>
                   <TextField
                          fullWidth
                          label="Maksimal Limit"
                          margin="dense"
                          name="maxLimit"
                          onChange={handleChange}
                          type="number"
                          value={values.maxLimit}
                          variant="outlined"
                      />
                </Grid>
                <Grid item xs={4}>
                  <h3>Tanggal PKS</h3>
                  <Divider />
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                   <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="pksEndDate"
                        label="Sampai"
                        value={pksEndDate}
                        onChange={handlePksEndDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        />
                </Grid>
                <Grid item xs={4}>
                  <h3>Tanggal Limit</h3>
                  <Divider />
                </Grid>
                <Grid item xs={4}>
                   <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="limitStartDate"
                        label="Dari"
                        value={limitStartDate}
                        onChange={handleLimitStartDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        variant="inline"
                      />
                </Grid>
                <Grid item xs={4}>
                   <KeyboardDatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="limitEndDate"
                        label="Sampai"
                        value={limitEndDate}
                        onChange={handleLimitEndDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined" className={classes.formControlSearch}>
                    <InputLabel id="demo-simple-select-outlined-label">Approval Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={values.approvalStatus}
                      label="Approval Status"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Menunggu Persetujuan</MenuItem>
                      <MenuItem value={2}>Disetujui</MenuItem>
                      <MenuItem value={3}>Ditolak</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
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

MitraToolbar.propTypes = {
  className: PropTypes.string
};

export default MitraToolbar;
