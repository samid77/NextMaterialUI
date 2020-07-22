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
import { NumberFormatHelper } from '../../helpers/NumberFormatHelper';
import { SkenarioKuota, SkenarioKuotaListState } from '../../interfaces/SkenarioKuota';
import { updateSkenarioKuota, deleteSkenarioKuota } from '../../redux/actions/SkenarioKuotaAction';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
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
  closeButtonSkenario: {
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
}));

let totalData = 0;
const validateSkenarioProps = (val) => {
  if(typeof(val) === 'object') {
    return totalData = Object.keys(val).length
  } else {
    return totalData;
  }
}

export function SkenarioKuotaList(props) {
  const defaultVal: SkenarioKuota = {
    id:'',
    namaSkenario: '',
    kuota: 0,
    berlakuDari: '',
    berlakuSampai:'',
  };

  const { className, skenario, ...rest } = props;
  validateSkenarioProps(skenario);
  const skenarioKuotaState: SkenarioKuotaListState = useSelector((state: AppState) => state.skenarioKuota);
  const prevResponse = usePrevious(skenarioKuotaState.action);

  useEffect(() => {
    if(prevResponse !== undefined && prevResponse !== skenarioKuotaState.action) {
      if(skenarioKuotaState.action === 'UPDATE_SKENARIOKUOTA_ERROR') {
        setErrorAlert(true);
        setLoading(false)
      } else if(skenarioKuotaState.action === 'UPDATE_SKENARIOKUOTA_SUCCESS') {
        values.namaSkenario =  '';
        values.kuota =  0;
        values.berlakuDari =  '';
        values.berlakuSampai =  '';
        setErrorAlert(false);
        setOpenForm(false);
        setLoading(false);
        setSuccessAlert(true);
      } else if(skenarioKuotaState.action === 'DELETE_SKENARIOKUOTA_SUCCESS') {
        setDeleteError(false);
        setDeleteSuccess(true);
        setOpenDeleteConfirm(false);
        setLoading(false);
      } else if(skenarioKuotaState.action === 'DELETE_SKENARIOKUOTA_ERROR') {
        setOpenDeleteConfirm(false);
        setDeleteError(true);
        setLoading(false);
      }
    } 
  }, [skenarioKuotaState.action]);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [deleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showProgress, setShowProgress] = useState(true);
  const [page, setPage] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [skenarioId, setSkenarioId] = useState(0);
  const [openForm, setOpenForm] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [values, setValues] = useState<SkenarioKuota>(defaultVal);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorUpdateAlert, setErrorUpdateAlert] = useState(false);
  
  const [berlakuDariDate, setberlakuDariDate] = React.useState(new Date());
  const handleberlakuDariDateChange = (date: Date | null) => {
    setberlakuDariDate(date);
    values.berlakuDari = date.toString();
  };
  const [berlakuSampaiDate, setberlakuSampaiDate] = React.useState(new Date());
  const handleberlakuSampaiDateChange = (date: Date | null) => {
    setberlakuSampaiDate(date);
    values.berlakuSampai = date.toString();
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
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Des";

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
    values.kuota = currentSkenario.kuota;
    values.berlakuDari = currentSkenario.berlakuDari;
    values.berlakuSampai = currentSkenario.berlakuSampai;
    setberlakuDariDate(currentSkenario.berlakuDari);
    setberlakuSampaiDate(currentSkenario.berlakuSampai);
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

  const openDeleteConfirm = (id: number) => {
    setSkenarioId(id);
    setOpenDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const deleteSkenario = () => {
    try {
      setLoading(true);
      dispatch(deleteSkenarioKuota(skenarioId));
    } catch (error) {
      console.error(error.message);
    }
  }
  const updateSkenario = () => {
    values.berlakuSampai = formatDate(berlakuSampaiDate);
    values.berlakuDari = formatDate(berlakuDariDate);
    try {
      setLoading(true);
      dispatch(updateSkenarioKuota(values));
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
                  onClick={() => setDeleteError(false)}
              >
                <a style={{color: "white", textDecoration: "none"}}>OK</a>
              </Button>
            </React.Fragment>
          } 
        show={deleteError} onConfirm={() => setDeleteError(false)}>
        Failed to delete data from server!
      </SweetAlert>
      <SweetAlert success title="Skenario Kuota Updated!" 
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
                      <TableCell data-testid="kolomKuota" className={classes.tableClass}>Kuota</TableCell>
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
                      : skenario === null || isEmpty(skenario.Result) || skenario.Result === undefined ? <TableRow>
                          <TableCell align="center" colSpan={8} rowSpan={5}>
                            <img src={'/images/nodata.jpg'} height="400" width="400"/>
                          </TableCell>
                        </TableRow>
                      : skenario.Result.slice(0, rowsPerPage).map(m => (
                          <TableRow hover key={m.id}>
                            <TableCell className={classes.tableDataClass}>{m.namaSkenario}</TableCell>
                            <TableCell className={classes.tableDataClass}>{currency.format(m.kuota)}</TableCell>
                            <TableCell className={classes.tableDataClass}>{displayDate(m.berlakuDari.substring(0,10))}</TableCell>
                            <TableCell className={classes.tableDataClass}>{displayDate(m.berlakuSampai.substring(0,10))}</TableCell>
                            <TableCell>
                                <div>
                                    <IconButton onClick={() => openDeleteConfirm(m.id)} aria-label="delete">
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
        fullWidth
        open={deleteConfirm}
        onClose={closeDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h2">Hapus data skenario ini?</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Data akan sepenuhnya terhapus dari sistem.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" className={classes.buttons} onClick={closeDeleteConfirm} color="secondary">
            Batal
          </Button>
          <Button variant="contained" className={classes.buttons} onClick={deleteSkenario} color="primary" autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={closeFormModal}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="editdataskenario">
          <MuiDialogTitle disableTypography className={classes.dialogTitleSectionSkenario}>
            <Typography variant="h5">Edit Data Skenario</Typography>
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
                        variant="filled"
                        margin="dense"
                        disabled
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
                        variant="filled"
                        margin="dense"
                        disabled
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
                        disabled
                        value={berlakuDariDate}
                        onChange={handleberlakuDariDateChange}
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
                        onChange={handleberlakuSampaiDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                      {errorAlert 
                        ? <Alert severity="error">
                            <AlertTitle>Update Skenario Prioritas Failed</AlertTitle>
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
              onClick={updateSkenario}>
              Update Data
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

SkenarioKuotaList.propTypes = {
  className: PropTypes.string,
  skenario: PropTypes.any,
};

export default SkenarioKuotaList;
