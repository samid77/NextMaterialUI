import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { green, purple, red } from '@material-ui/core/colors';
import { SearchInputCustom } from './SearchInputCustom';
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
    minWidth: 520
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
  }

}));

export function MitraToolbar(props) {
  const { className, ...rest } = props;
  const [openForm, setOpenForm] = React.useState(false);
  const [openAdvanceSearch, setOpenAdvanceSearch] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2020-08-18T21:11:54'),
  );
  const [selectedLimitDate, setSelectedLimitDate] = React.useState<Date | null>(
    new Date('2020-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleLimitDateChange = (date: Date | null) => {
    setSelectedDate(date);
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

  const [approvalStatus, setApprovalStatus] = React.useState('');

  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setApprovalStatus(event.target.value as string);
  };

  const [values, setValues] = useState({
    namaMitra: '',
    tanggalPKS: '',
    tanggalLimit: '',
    targetUnit: '',
    targetNominal: '',
    maxLimit: '',
    approvalStatus: '',
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {/* <div className={classes.row}>
        
      </div> */}
      <div className={classes.row}>
        <SearchInputCustom
          className={classes.searchInput}
          placeholder="Cari Mitra"
        />
        <span className={classes.spacer} />
        <Button
            variant="contained"
            className={classes.advanceSearch}
            startIcon={<PageviewRoundedIcon />}
            onClick={openSearchModal}
        >
          <a style={{color: "white", textDecoration: "none"}}>Advanced Search</a>
        </Button>
        <Button
            color="primary"
            variant="contained"
            className={classes.buttons}
            startIcon={<PublishRoundedIcon />}
        >
          <a style={{color: "white", textDecoration: "none"}}>Export to CSV</a>
        </Button>
        <Button
            color="secondary"
            variant="contained"
            className={classes.buttons}
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={openFormModal}
        >
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
           <form
            autoComplete="off"
            noValidate
        >
            <CardContent>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                      container
                      spacing={3}
                  >
                      <Grid
                      item
                      md={12}
                      xs={12}
                      >
                      <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={daftarMitra.map((m) => m.nama)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nama Mitra"
                            margin="normal"
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
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                      <KeyboardDatePicker
                        disableToolbar
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Dari"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        variant="outlined"
                      />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                      <KeyboardDatePicker
                        disableToolbar 
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Sampai"
                        value={selectedLimitDate}
                        onChange={handleLimitDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </Grid>
                      <Grid item md={12} xs={12} className={classes.dateLabel}>
                      <Divider />
                        <h3>Tanggal Limit</h3>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                      <KeyboardDatePicker
                        disableToolbar
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Dari"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        variant="outlined"
                      />
                      </Grid>
                      <Grid
                      item
                      md={6}
                      xs={12}
                      >
                      <KeyboardDatePicker
                        disableToolbar 
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Sampai"
                        value={selectedLimitDate}
                        onChange={handleLimitDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </Grid>
                      <Grid
                      item
                      md={12}
                      xs={12}
                      >
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
                      <Grid
                      item
                      md={12}
                      xs={12}
                      >
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
                      <Grid
                      item
                      md={12}
                      xs={12}
                      >
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
                      <Grid item md={12} xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-label">Approval Status</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values.approvalStatus}
                            onChange={handleChangeStatus}
                            label="Approval Status"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Menunggu Persetujuan</MenuItem>
                            <MenuItem value={20}>Disetujui</MenuItem>
                            <MenuItem value={30}>Ditolak</MenuItem>
                          </Select>
                        </FormControl>
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
              onClick={closeFormModal}
          >
              Simpan Data
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openAdvanceSearch}
        onClose={closeSearchModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="tambahdatamitra">Cari Data Mitra</DialogTitle>
        <DialogContent className={classes.dialogContent}>
           <form
            autoComplete="off"
            noValidate
        >
            <CardContent>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                      container
                      spacing={3}
                  >
                      <Grid
                      item
                      md={12}
                      xs={12}
                      >
                      <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={daftarMitra.map((m) => m.nama)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nama Mitra"
                            margin="normal"
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
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                      <KeyboardDatePicker
                        disableToolbar
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Dari"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        variant="outlined"
                      />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                      <KeyboardDatePicker
                        disableToolbar 
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Sampai"
                        value={selectedLimitDate}
                        onChange={handleLimitDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </Grid>
                      <Grid item md={12} xs={12} className={classes.dateLabel}>
                      <Divider />
                        <h3>Tanggal Limit</h3>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                      <KeyboardDatePicker
                        disableToolbar
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Dari"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        variant="outlined"
                      />
                      </Grid>
                      <Grid
                      item
                      md={6}
                      xs={12}
                      >
                      <KeyboardDatePicker
                        disableToolbar 
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Sampai"
                        value={selectedLimitDate}
                        onChange={handleLimitDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </Grid>
                      <Grid
                      item
                      md={12}
                      xs={12}
                      >
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
                      <Grid
                      item
                      md={12}
                      xs={12}
                      >
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
                      <Grid
                      item
                      md={12}
                      xs={12}
                      >
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
                      <Grid item md={12} xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-label">Approval Status</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values.approvalStatus}
                            onChange={handleChangeStatus}
                            label="Approval Status"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Menunggu Persetujuan</MenuItem>
                            <MenuItem value={20}>Disetujui</MenuItem>
                            <MenuItem value={30}>Ditolak</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                  </Grid>
              </MuiPickersUtilsProvider>
            </CardContent>
            <Divider />
        </form>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <Button
              className={classes.advanceSearch}
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={closeSearchModal}
          >
              Cari Data
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const daftarMitra = [
  { nama: 'Bank Negara Indonesia - BNI'},
  { nama: 'Bank Central Asia - BCA'},
  { nama: 'Bank DKI'},
  { nama: 'Bank OCBC NISP'},
  { nama: 'Bank Tabungan Negara - BTN'}
];

MitraToolbar.propTypes = {
  className: PropTypes.string
};

export default MitraToolbar;
