import React, { useState, Fragment, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Grid,
  Divider,
  TextField
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Chip from '@material-ui/core/Chip';
import { yellow, red } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getMitra } from '../redux/actions/TestActions';
import DateFnsUtils from '@date-io/date-fns';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SearchIcon from '@material-ui/icons/Search';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { MitraDataListState } from '../interfaces/MitraData';
import { updateMitraData, getMitraData, deleteMitraData } from '../redux/actions/MitraDataAction';
import InputMask from 'react-input-mask';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  ditolakChip: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  menungguChip: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
}));

export function MitraList(props) {
  const { className, mitra, ...rest } = props;
  const mitraDataState: MitraDataListState = useSelector((state: AppState) => state.mitraData);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [deleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [mitraId, setMitraId] = useState(0);
  const [data, setData] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [namamitra, setNamaMitra] = React.useState<string | null>(daftarMitra[0]);
  const [values, setValues] = useState({
    id: 0,
    nama: '',
    tanggalPKS: '',
    pksStartDate: '',
    pksEndDate: '',
    tanggalLimit: '',
    limitStartDate: '',
    limitEndDate: '',
    targetUnit: '',
    targetNominal: '',
    maxLimit: '',
    approvalStatus: 1,
    createdAt: new Date()
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [pksStartDate, setPksStartDate] = React.useState('');
  const handlePksStartDateChange = (date: Date | null) => {
    setPksStartDate(date);
    values.pksStartDate = date;
    values.tanggalPKS = date;
  };
  const [pksEndDate, setPksEndDate] = React.useState('');
  const handlePksEndDateChange = (date: Date | null) => {
    setPksEndDate(date);
    values.pksEndDate = date;
  };
  const [limitStartDate, setLimitStartDate] = React.useState('');
  const handleLimitStartDateChange = (date: Date | null) => {
    setLimitStartDate(date);
    values.limitStartDate = date;
    values.tanggalLimit = date;
  };
  const [limitEndDate, setLimitEndDate] = React.useState('');
  const handleLimitEndDateChange = (date: Date | null) => {
    setLimitEndDate(date);
    values.limitEndDate = date;
  };

  const openFormModal = (data) => {
    values.id = data.id;
    setMitraId(data.id);
    const indexMitra = daftarMitra.findIndex(d => d.nama === data.nama);
    setNamaMitra(daftarMitra[indexMitra]);
    values.nama = daftarMitra[indexMitra].nama;
    values.targetNominal = data.targetNominal;
    values.targetUnit = data.targetUnit;
    values.maxLimit = data.maxLimit;
    values.tanggalPKS = data.pksStartDate;
    values.pksStartDate = data.pksStartDate;
    values.pksEndDate = data.pksEndDate;
    values.tanggalLimit = data.limitStartDate;
    values.limitStartDate = data.limitStartDate;
    values.limitEndDate = data.limitEndDate;
    setOpenForm(true);
  };

  const closeFormModal = () => {
    setOpenForm(false);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const openDeleteConfirm = (id: number) => {
    setMitraId(id);
    setOpenDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const deleteDataMitra = () => {
    try {
      dispatch(deleteMitraData(mitraId));
      setDeleteSuccess(true);
      setOpenDeleteConfirm(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  const updateData = () => {
    values.nama = namamitra.nama;
    values.targetUnit = values.targetUnit.split(' '). join('');
    values.targetNominal = values.targetNominal.split(' '). join('');
    values.maxLimit = values.maxLimit.split(' '). join('');
    try {
      dispatch(updateMitraData(values));
      setSuccessAlert(true);
      setOpenForm(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  const currency = new Intl.NumberFormat('in-IN', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <Fragment>
      <SweetAlert success title="Data Updated!" 
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
        show={successAlert} onConfirm={() => setSuccessAlert(false)}>
        Data is successfully updated!
      </SweetAlert>
      <SweetAlert success title="Data Deleted!" 
          customButtons={
            <React.Fragment>
              <Button
                  color="primary"
                  variant="contained"
                  className={classes.buttons}
                  onClick={() => setDeleteSuccess(false)}
              >
                <a style={{color: "white", textDecoration: "none"}}>OK</a>
              </Button>
            </React.Fragment>
          } 
        show={deleteSuccess} onConfirm={() => setSuccessAlert(false)}>
        Data is successfully updated!
      </SweetAlert>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nama</TableCell>
                        <TableCell>Tanggal PKS</TableCell>
                        <TableCell>Tanggal Limit</TableCell>
                        <TableCell>Target Unit</TableCell>
                        <TableCell>Target Nominal</TableCell>
                        <TableCell>Maksimal Limit</TableCell>
                        <TableCell>Approval Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        { data.length > 0 ? data.slice(0, rowsPerPage).map(m => (
                          <TableRow
                              className={classes.tableRow}
                              hover
                              key={m.id}
                          >
                            <TableCell>
                              <div className={classes.nameContainer}>
                                  <Typography variant="body1">{m.nama}</Typography>
                              </div>
                            </TableCell>
                            <TableCell>{m.tanggalPKS.substring(0,10)}</TableCell>
                            <TableCell>{m.tanggalLimit.substring(0,10)}</TableCell>
                            <TableCell>{currency.format(m.targetUnit)}</TableCell>
                            <TableCell>{currency.format(m.targetNominal)}</TableCell>
                            <TableCell>{currency.format(m.maxLimit)}</TableCell>
                            <TableCell>
                              {m.approvalStatus === 3 
                                ?  <Chip
                                      icon={<CheckCircleRoundedIcon />}
                                      label='Disetujui'
                                      color="primary"
                                    /> 
                                : m.approvalStatus === 2 ? <Chip
                                    icon={<CancelRoundedIcon className={classes.ditolakChip}/>}
                                    label='Ditolak'
                                    className={classes.ditolakChip}
                                  />
                                : <Chip
                                    icon={<TimerRoundedIcon className={classes.menungguChip}/>}
                                    label='Menunggu Persetujuan'
                                    className={classes.menungguChip}
                                  />
                              }
                            </TableCell>
                            <TableCell>
                                <div>
                                    <IconButton 
                                      onClick={() => openDeleteConfirm(m.id)} 
                                      aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton 
                                      onClick={() => openFormModal(m)}
                                      aria-label="edit">
                                        <EditRoundedIcon />
                                    </IconButton>
                                    <IconButton aria-label="view" color="primary">
                                        <VisibilityRoundedIcon />
                                    </IconButton>
                                </div>
                            </TableCell>
                          </TableRow>
                        )) : mitra.slice(0, rowsPerPage).map(m => (
                          <TableRow
                              className={classes.tableRow}
                              hover
                              key={m.id}
                          >
                            <TableCell>
                              <div className={classes.nameContainer}>
                                  <Typography variant="body1">{m.nama}</Typography>
                              </div>
                            </TableCell>
                            <TableCell>{m.tanggalPKS.substring(0,10)}</TableCell>
                            <TableCell>{m.tanggalLimit.substring(0,10)}</TableCell>
                            <TableCell>{currency.format(m.targetUnit)}</TableCell>
                            <TableCell>{currency.format(m.targetNominal)}</TableCell>
                            <TableCell>{currency.format(m.maxLimit)}</TableCell>
                            <TableCell>
                              {m.approvalStatus === 3 
                                ?  <Chip
                                      icon={<CheckCircleRoundedIcon />}
                                      label='Disetujui'
                                      color="primary"
                                    /> 
                                : m.approvalStatus === 2 ? <Chip
                                    icon={<CancelRoundedIcon className={classes.ditolakChip}/>}
                                    label='Ditolak'
                                    className={classes.ditolakChip}
                                  />
                                : <Chip
                                    icon={<TimerRoundedIcon className={classes.menungguChip}/>}
                                    label='Menunggu Persetujuan'
                                    className={classes.menungguChip}
                                  />
                              }
                            </TableCell>
                            <TableCell>
                                <div>
                                    <IconButton onClick={() => openDeleteConfirm(m.id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => openFormModal(m)} aria-label="edit">
                                        <EditRoundedIcon />
                                    </IconButton>
                                    <IconButton aria-label="view" color="primary">
                                        <VisibilityRoundedIcon />
                                    </IconButton>
                                </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
              </TableContainer>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={mitra.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <Dialog
        open={deleteConfirm}
        onClose={closeDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hapus data mitra ini?"}</DialogTitle>
        <DialogActions>
          <Button onClick={closeDeleteConfirm} color="primary">
            Batal
          </Button>
          <Button onClick={deleteDataMitra} color="primary" autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={closeFormModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="tambahdatamitra">Edit Data Mitra</DialogTitle>
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
                        value={values.pksStartDate}
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
                        value={values.pksEndDate}
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
                        value={values.limitStartDate}
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
                        value={values.limitEndDate}
                        onChange={handleLimitEndDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <InputMask
                          mask="999 999 999 999"
                          value={values.targetUnit}
                          onChange={handleChange}>
                          {() => <TextField
                            fullWidth
                            label="Target Unit"
                            margin="dense"
                            name="targetUnit"
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
              onClick={updateData}
          >
              Update Data
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const daftarMitra = [
  { nama: 'Bank Negara Indonesia - BNI'},
  { nama: 'Bank Central Asia - BCA'},
  { nama: 'Bank DKI'},
  { nama: 'Bank OCBC NISP'},
  { nama: 'Bank Tabungan Negara - BTN'}
];

MitraList.propTypes = {
  className: PropTypes.string,
  mitra: PropTypes.array.isRequired
};

export default MitraList;
