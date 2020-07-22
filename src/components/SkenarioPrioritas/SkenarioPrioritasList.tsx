import React, { useState, Fragment, useEffect } from 'react';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SweetAlert from 'react-bootstrap-sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';
import { green } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NumberFormatHelper } from '../../helpers/NumberFormatHelper';
import { SkenarioPrioritas, SkenarioPrioritasListState } from '../../interfaces/SkenarioPrioritas';
import { updateSkenarioPrioritas, deleteSkenarioPrioritas } from '../../redux/actions/SkenarioPrioritasAction';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import usePrevious from '../../helpers/usePrevious';

const useStyles = makeStyles((theme:Theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  produkNameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  tableClass: {
    fontWeight: 600
  },
  tableDataClass: {
    fontWeight: 500
  },
  customTableHead: {
    backgroundColor: '#C2E8CE'
  },
  dialogTitleSection: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttons: {
    marginLeft: theme.spacing(1)
  },
  tableRow: {},
  dialogContent: {},
  dateLabel: {},
  dialogAction: {},
}));

let totalData = 0;
const validateSkenarioProps = (val) => {
  if(typeof(val) === 'object') {
    return totalData = Object.keys(val).length
  } else {
    return totalData;
  }
}

export function SkenarioPrioritasList(props) {
  const defaultVal: SkenarioPrioritas = {
    id:'',
    namaSkenario: '',
    kriteria1: false,
    kriteria2: false,
    kriteria3: false,
    kriteria4: false,
    kriteria5: false,
    berlakuDari: '',
    berlakuSampai:'',
  };

  const { className, prioritas, ...rest } = props;
  validateSkenarioProps(prioritas);
  const skenarioPrioritasState: SkenarioPrioritasListState = useSelector((state: AppState) => state.skenarioPrioritas);
  const prevResponse = usePrevious(skenarioPrioritasState.action);
  useEffect(() => {
    if(prevResponse !== undefined && prevResponse !== skenarioPrioritasState.action) {
      if(skenarioPrioritasState.action === 'UPDATE_SKENARIOPRIORITAS_ERROR') {
        setErrorAlert(true);
        setLoading(false)
      } else if(skenarioPrioritasState.action === 'UPDATE_SKENARIOPRIORITAS_SUCCESS') {
        values.namaSkenario = '';
        values.kriteria1 = false;
        values.kriteria2 = false;
        values.kriteria3 = false;
        values.kriteria4 = false;
        values.kriteria5 = false;
        values.berlakuDari = '';
        values.berlakuSampai = '';
        setErrorAlert(false);
        setOpenForm(false);
        setLoading(false);
        setSuccessAlert(true);
      } else if(skenarioPrioritasState.action === 'DELETE_SKENARIOPRIORITAS_SUCCESS') {
        setErrorAlert(false);
        setDeleteSuccess(true);
        setOpenDeleteConfirm(false);
        setLoading(false);
      } else if(skenarioPrioritasState.action === 'DELETE_SKENARIOPRIORITAS_ERROR') {
        setOpenDeleteConfirm(false);
        setDeleteSuccess(false);
        setErrorAlert(true);
        setLoading(false)
      }
    } 
  }, [skenarioPrioritasState.action]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [deleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showProgress, setShowProgress] = useState(true);
  const [page, setPage] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [skenarioId, setSkenarioId] = useState(0);
  const [openForm, setOpenForm] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [values, setValues] = useState<SkenarioPrioritas>(defaultVal);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorUpdateAlert, setErrorUpdateAlert] = useState(false);
  const [displaynamaskenario, setdisplaynamaskenario] = useState('');
  const [kriteriaState, setKriteriaState] = React.useState({
    masakepesertaan: false,
    kelancaranpembiayaan: false,
    statuskeluarga: false,
    penghasilanterendah: false,
    kemendesakankepemilikan: false,
  });

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

  const handleChangeKriteria = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKriteriaState({ ...kriteriaState, [event.target.name]: event.target.checked });
  };

  const displayDate = (d) => {
    let date = new Date(d);
      if ( isNaN(date .getTime())) {
        return d;
      } else {
        const  month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "Mei";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Agu";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Decs";

        let day = date.getDate();
        return day  + " " +month[date.getMonth()] + " " + date.getFullYear();
      }
  }

  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(false)
    }, 2000);
    return () => clearTimeout(timer);
  }, [])

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const isEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const openFormModal = (currentSkenario) => {
    values.id = currentSkenario.id;
    setSkenarioId(currentSkenario.id);
    values.namaSkenario = currentSkenario.namaSkenario;
    values.kriteria1 = currentSkenario.kriteria1;
    kriteriaState.penghasilanterendah = currentSkenario.kriteria1;
    values.kriteria2 = currentSkenario.kriteria2;
    kriteriaState.masakepesertaan = currentSkenario.kriteria2;
    values.kriteria3 = currentSkenario.kriteria3;
    kriteriaState.kelancaranpembiayaan = currentSkenario.kriteria3;
    values.kriteria4 = currentSkenario.kriteria4;
    kriteriaState.statuskeluarga = currentSkenario.kriteria4;
    values.kriteria5 = currentSkenario.kriteria5;
    kriteriaState.kemendesakankepemilikan = currentSkenario.kriteria5;
    values.berlakuDari = currentSkenario.berlakuDari;
    values.berlakuSampai = currentSkenario.berlakuSampai;
    setBerlakuDariDate(currentSkenario.berlakuDari);
    setBerlakuSampaiDate(currentSkenario.berlakuSampai);
    setOpenForm(true);
  };

  const closeFormModal = () => {
    setOpenForm(false);
  };

  const handlePageChange = (event, chosenPage) => {
    setPage(chosenPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const openDeleteConfirm = (currentSkenario) => {
    setSkenarioId(currentSkenario.id);
    setdisplaynamaskenario(currentSkenario.namaSkenario);
    setOpenDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const deleteSkenario = () => {
    try {
      setLoading(true);
      setTimeout(() => {
        dispatch(deleteSkenarioPrioritas(skenarioId));
      }, 2000);
    } catch (error) {
      console.error(error.message);
    }
  }
  const updateData = () => {
    values.berlakuSampai = formatDate(berlakuSampaiDate);
    values.berlakuDari = formatDate(berlakuDariDate);
    try {
      setLoading(true);
      dispatch(updateSkenarioPrioritas(values));
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
      <SweetAlert error title="Failed to delete data" 
          customButtons={
            <React.Fragment>
              <Button
                  color="primary"
                  variant="contained"
                  className={classes.buttons}
                  onClick={() => setErrorAlert(false)}
              >
                <a style={{color: "white", textDecoration: "none"}}>OK</a>
              </Button>
            </React.Fragment>
          } 
        show={errorAlert} onConfirm={() => setErrorAlert(false)}>
        Failed to delete data from server!
      </SweetAlert>
      <SweetAlert success title="Skenario Prioritas Updated!" 
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
        className={clsx(classes.root, className)}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <TableContainer>
                <Table>
                  <TableHead className={classes.customTableHead}>
                    <TableRow>
                      <TableCell data-testid="kolomNamaSkenario" className={classes.tableClass}>Nama Skenario</TableCell>
                      <TableCell data-testid="kolomKriteria" className={classes.tableClass}>Kriteria</TableCell>
                      <TableCell data-testid="kolomBerlakuDari" className={classes.tableClass}>Berlaku Dari</TableCell>
                      <TableCell data-testid="kolomBerlakuSampai" className={classes.tableClass}>Berlaku Sampai</TableCell>
                      <TableCell className={classes.tableClass}>Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showProgress
                      ? <TableRow>
                          <TableCell align="center" colSpan={8} rowSpan={5}>
                            <CircularProgress />
                          </TableCell>
                        </TableRow>
                      : prioritas === null || isEmpty(prioritas.Result) || prioritas.Result === undefined ? <TableRow>
                            <TableCell align="center" colSpan={8} rowSpan={5}>
                              <img src={'/images/nodata.jpg'} height="400" width="400"/>
                            </TableCell>
                          </TableRow>
                        : prioritas.Result.slice(0, rowsPerPage).map(m => (
                            <TableRow hover key={m.id}>
                              <TableCell className={classes.tableDataClass}>{m.namaSkenario}</TableCell>
                              <TableCell className={classes.tableDataClass}>
                                <List>
                                  {m.kriteria1 === true ? <ListItem>
                                    <ListItemText primary="Segmen Penghasilan"/>
                                  </ListItem> : null}
                                  {m.kriteria2 === true ? <ListItem>
                                    <ListItemText primary="Lama Masa Kepesertaan"/>
                                  </ListItem> : null}
                                  {m.kriteria3 === true ? <ListItem>
                                    <ListItemText primary="Kelancaran Pembayaran Simpanan"/>
                                  </ListItem> : null}
                                  {m.kriteria4 === true ? <ListItem>
                                    <ListItemText primary="Status Keluarga Peserta"/>
                                  </ListItem> : null}
                                  {m.kriteria5 === true ? <ListItem>
                                    <ListItemText primary="Kemendesakan Pemilikan Rumah"/>
                                  </ListItem> : null}
                                </List>
                              </TableCell>
                              <TableCell className={classes.tableDataClass}>{displayDate(m.berlakuDari.substring(0,10))}</TableCell>
                              <TableCell className={classes.tableDataClass}>{displayDate(m.berlakuSampai.substring(0,10))}</TableCell>
                              <TableCell>
                                  <div>
                                      <IconButton onClick={() => openDeleteConfirm(m)} aria-label="delete">
                                          <DeleteIcon />
                                      </IconButton>
                                      <IconButton onClick={() => openFormModal(m)} aria-label="edit">
                                          <EditRoundedIcon />
                                      </IconButton>
                                  </div>
                              </TableCell>
                            </TableRow>
                          ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={totalData}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={closeFormModal}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="editdataatamitra">
          <MuiDialogTitle disableTypography className={classes.dialogTitleSection}>
            <Typography variant="h5">Edit Skenario Prioritas</Typography>
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
                      <TextField
                        label="Nama Skenario"
                        value={values.namaSkenario}
                        onChange={handleChange}
                        name="namaSkenario"
                        id="namaSkenario" 
                        disabled
                        required={true}
                        variant="outlined"
                        margin="dense"
                        fullWidth/>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormControlLabel
                        value={values.kriteria1}
                        control={<Switch color="primary" disabled checked={kriteriaState.penghasilanterendah} onChange={handleChangeKriteria} name="penghasilanterendah"/>}
                        label="Segmen Penghasilan"
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormControlLabel
                        value={values.kriteria2}
                        control={<Switch color="primary" disabled checked={kriteriaState.masakepesertaan} onChange={handleChangeKriteria} name="masakepesertaan" />}
                        label="Lama Masa Kepesertaan"
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormControlLabel
                        value={values.kriteria3}
                        control={<Switch color="primary" disabled checked={kriteriaState.kelancaranpembiayaan} onChange={handleChangeKriteria} name="kelancaranpembiayaan" />}
                        label="Kelancaran Pembiayaan"
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormControlLabel
                        value={values.kriteria4}
                        control={<Switch color="primary" disabled checked={kriteriaState.statuskeluarga} onChange={handleChangeKriteria} name="statuskeluarga"/>}
                        label="Status Keluarga Peserta"
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormControlLabel
                        value={values.kriteria5}
                        control={<Switch color="primary" disabled checked={kriteriaState.kemendesakankepemilikan} onChange={handleChangeKriteria} name="kemendesakankepemilikan"/>}
                        label="Kemendesakan Pemilikan Rumah"
                        labelPlacement="end"
                      />
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
                        disabled
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
                            <AlertTitle>Update Skenario Prioritas Failed</AlertTitle>
                            {skenarioPrioritasState.error.msg}
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
                startIcon={<SaveRoundedIcon />}
                disabled={
                  values.namaSkenario === '' ||
                  loading}
                onClick={updateData}>
                Update Data
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        open={deleteConfirm}
        onClose={closeDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          <div>
            <Typography variant="h2">Hapus data {displaynamaskenario}?</Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Data akan sepenuhnya terhapus dari sistem.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className={classes.wrapper}>
            <Button 
              variant="contained" 
              className={classes.buttons} 
              onClick={closeDeleteConfirm} 
              color="primary"
              disabled={loading}>
              Batal
            </Button>
            <Button 
              variant="contained" 
              className={classes.buttons} 
              onClick={deleteSkenario} 
              color="primary" 
              disabled={loading}
              autoFocus>
              Hapus
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

SkenarioPrioritasList.propTypes = {
  className: PropTypes.string,
  prioritas: PropTypes.any,
};

export default SkenarioPrioritasList;
