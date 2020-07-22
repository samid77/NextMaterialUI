import React, { useState, Fragment, useEffect } from 'react';
import { AppState } from '../../redux/reducers';
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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Chip from '@material-ui/core/Chip';
import { yellow, red, green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { MitraData, DaftarMitra, MitraDataListState } from '../../interfaces/MitraData';
import { updateMitraData, deleteMitraData } from '../../redux/actions/MitraDataAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NumberFormatHelper } from '../../helpers/NumberFormatHelper';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme:Theme) => ({
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
  customTableHead: {
    backgroundColor: '#C2E8CE'
  },
  tableClass: {
    fontWeight: 600
  },
  tableDataClass: {
    fontWeight: 500,
    letterSpacing: '-0.05px'
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
  buttons: {},
  tableRow: {},
  dialogAction: {},
}));

let totalData = 0;
const validateMitraProps = (val) => {
  if(typeof(val) === 'object' && val !== null) {
    return totalData = Object.keys(val).length
  } else {
    return totalData;
  }
}

const daftarMitra = [
  { id:"ac954e5f-b55f-4849-b614-97e2ea91cbed", namaMitra: 'Bank Negara Indonesia - BNI'},
  { id:"b76067a8-3e35-4ddd-8282-7d662f20469d", namaMitra: 'Bank Central Asia - BCA'},
  { id:"1e90f800-48f5-4086-a74b-dcddd92b2a6f", namaMitra: 'Bank DKI'},
  { id:"6f36868a-a9f9-43ea-aef0-c177ddb52286", namaMitra: 'Bank OCBC NISP'},
  { id:"87e9d04e-2a31-4cea-b66d-9923407de6e6", namaMitra: 'Bank Tabungan Negara - BTN'},
  { id:"6ee9a834-a9a9-4d2a-95e0-5dc990abc567", namaMitra: 'TEST_MITRA1 - updated'},
  { id:"6ee9a834-a9a9-4d2a-95e0-4dc780bdf020", namaMitra: 'TEST_MITRA1'},
  { id:"8637de20-def8-4e98-9401-1f38a354264b", namaMitra: 'TEST_MITRA2'},
  { id:"1ac52c32-9557-437d-9f3d-a7adcd683e70", namaMitra: 'TEST_MITRA3'},
  { id:"0d7050bf-faec-44c5-9fbb-48e824baa2ec", namaMitra: 'TEST_MITRA4'},
];

export function MitraList(props) {
  const defaultValues: MitraData = {
    id: '',
    namaMitra: '',
    tanggalMulaiPKS: '',
    tanggalAkhirPKS: '',
    tanggalMulaiLimit: '',
    tanggalAkhirLimit: '',
    targetUnit: 0,
    targetNominal: 0,
    maksimalLimit: 0,
    sisaLimit: 0,
    approvalStatus: '',
  };

  const { className, mitra, ...rest } = props;
  const mitraDataState: MitraDataListState = useSelector((state: AppState) => state.mitraData);
  validateMitraProps(mitra);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [deleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showProgress, setShowProgress] = useState(true);
  const [page, setPage] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [mitraId, setMitraId] = useState('');
  const [openForm, setOpenForm] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [namamitra, setNamaMitra] = React.useState<any | null>(daftarMitra[0]);
  const [values, setValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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

  const [tanggalMulaiPKS, settanggalMulaiPKS] = React.useState(new Date());
  const handletanggalMulaiPKSChange = (date: Date | null) => {
    settanggalMulaiPKS(date);
    values.tanggalMulaiPKS = date.toString();
  };
  const [tanggalAkhirPKS, settanggalAkhirPKS] = React.useState(new Date());
  const handletanggalAkhirPKSChange = (date: Date | null) => {
    settanggalAkhirPKS(date);
    values.tanggalAkhirPKS = date.toString();
  };
  const [tanggalMulaiLimit, settanggalMulaiLimit] = React.useState(new Date());
  const handletanggalMulaiLimitChange = (date: Date | null) => {
    settanggalMulaiLimit(date);
    values.tanggalMulaiLimit = date.toString();
  };
  const [tanggalAkhirLimit, settanggalAkhirLimit] = React.useState(new Date());
  const handletanggalAkhirLimitChange = (date: Date | null) => {
    settanggalAkhirLimit(date);
    values.tanggalAkhirLimit = date.toString();
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

  const parseTargetUnit = (tgrunit) => {
    return tgrunit.toString().split('').reverse().join('').match(/.{1,3}/g).map(function(x){
        return x.split('').reverse().join('')
    }).reverse();
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

  const openFormModal = (currentMitra) => {
    values.id = currentMitra.id;
    setMitraId(currentMitra.id);
    const indexMitra = daftarMitra.findIndex(d => d.namaMitra === currentMitra.namaMitra);
    setNamaMitra(daftarMitra[indexMitra]);
    values.namaMitra = daftarMitra[indexMitra].namaMitra;
    values.targetNominal = currentMitra.targetNominal;
    values.targetUnit = currentMitra.targetUnit;
    values.maksimalLimit = currentMitra.maksimalLimit;
    values.sisaLimit = currentMitra.sisaLimit;
    settanggalMulaiPKS(currentMitra.tanggalMulaiPKS);
    values.tanggalMulaiPKS = currentMitra.tanggalMulaiPKS;
    settanggalAkhirPKS(currentMitra.tanggalAkhirPKS);
    values.tanggalAkhirPKS = currentMitra.tanggalAkhirPKS;
    values.tanggalMulaiLimit = currentMitra.tanggalMulaiLimit;
    settanggalMulaiLimit(currentMitra.tanggalMulaiLimit);
    values.tanggalAkhirLimit = currentMitra.tanggalAkhirLimit;
    settanggalAkhirLimit(currentMitra.tanggalAkhirLimit);
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

  const openDeleteConfirm = (id: string) => {
    setMitraId(id);
    setOpenDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const isEmpty = (obj) => {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }

  const deleteDataMitra = () => {
    try {
      dispatch(deleteMitraData(mitraId));
      setDeleteSuccess(true);
      setOpenDeleteConfirm(false);
    } catch (error) {
      console.error(error.message);
    }
  }



  const currency = new Intl.NumberFormat('in-IN', {
    style: 'currency',
    currency: 'IDR',
  });

  const updateData = () => {
    values.namaMitra = namamitra.namaMitra;
    values.tanggalMulaiPKS = formatDate(tanggalMulaiPKS);
    values.tanggalAkhirPKS = formatDate(tanggalAkhirPKS)
    values.tanggalMulaiLimit = formatDate(tanggalMulaiLimit);
    values.tanggalAkhirLimit = formatDate(tanggalAkhirLimit);
    values.targetUnit = parseInt(values.targetUnit.toString().split(' '). join(''));
    values.targetNominal = parseInt(values.targetNominal.toString().split(' '). join(''));
    values.maksimalLimit = parseInt(values.maksimalLimit.toString().split(' '). join(''));
    try {
      setLoading(true);
      setTimeout(() => {
        dispatch(updateMitraData(values));
        if(mitraDataState.response === 400 || mitraDataState.response === 500) {
          setErrorAlert(true);
          setLoading(false)
        } else {
          setErrorAlert(false);
          setOpenForm(false);
          setLoading(false);
          setSuccessAlert(true);
        }
      }, 2000);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
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
       <SweetAlert success title="Data Mitra Updated!" 
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
                        <TableCell data-testid="kolomNamaMitra" className={classes.tableClass}>Nama Mitra</TableCell>
                        <TableCell data-testid="kolomTanggalPKS" className={classes.tableClass}>Tanggal PKS</TableCell>
                        <TableCell data-testid="kolomTanggalLimit" className={classes.tableClass}>Tanggal Limit</TableCell>
                        <TableCell data-testid="kolomTargetUnit" className={classes.tableClass}>Target Unit</TableCell>
                        <TableCell data-testid="kolomTargetNominal" className={classes.tableClass}>Target Nominal</TableCell>
                        <TableCell data-testid="kolomMaksimalLimit" className={classes.tableClass}>Maksimal Limit</TableCell>
                        <TableCell data-testid="kolomSisaLimit" className={classes.tableClass}>Sisa Limit</TableCell>
                        <TableCell data-testid="kolomApprovalStatus" className={classes.tableClass}>Approval Status</TableCell>
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
                        : mitra === null || isEmpty(mitra.Result) ? <TableRow>
                          <TableCell align="center" colSpan={8} rowSpan={5}>
                            <img src={'/images/nodata.jpg'} height="400" width="400"/>
                          </TableCell>
                        </TableRow>
                        : mitra.Result.slice(0, rowsPerPage).map(m => (
                            <TableRow className={classes.tableRow} hover key={m.id}>
                              <TableCell className={classes.tableDataClass}>{m.namaMitra}</TableCell>
                              <TableCell className={classes.tableDataClass}>{displayDate(m.tanggalMulaiPKS.substring(0,10))}</TableCell>
                              <TableCell className={classes.tableDataClass}>{displayDate(m.tanggalMulaiLimit.substring(0,10))}</TableCell>
                              <TableCell className={classes.tableDataClass}>{parseTargetUnit(m.targetUnit).join('.')}</TableCell>
                              <TableCell className={classes.tableDataClass}>{currency.format(m.targetNominal)}</TableCell>
                              <TableCell className={classes.tableDataClass}>{currency.format(m.maksimalLimit)}</TableCell>
                              <TableCell className={classes.tableDataClass}>{currency.format(m.sisaLimit)}</TableCell>
                              <TableCell>
                                {m.approvalStatus === '1' 
                                  ?  <Chip
                                        icon={<CheckCircleRoundedIcon />}
                                        label='Disetujui'
                                        color="primary"
                                      /> 
                                  : m.approvalStatus === '2' ? <Chip
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
            <Typography variant="h5">Edit Data Mitra</Typography>
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
                              required={true}
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
                          id="tanggalMulaiPKS"
                          label="Dari"
                          value={values.tanggalMulaiPKS}
                          onChange={handletanggalMulaiPKSChange}
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
                          id="tanggalAkhirPKS"
                          minDate={tanggalMulaiPKS}
                          minDateMessage={'Tanggal harus setelah tanggal mulai PKS'}
                          label="Sampai"
                          value={tanggalAkhirPKS}
                          onChange={handletanggalAkhirPKSChange}
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
                          id="tanggalMulaiLimit"
                          label="Dari"
                          value={values.tanggalMulaiLimit}
                          onChange={handletanggalMulaiLimitChange}
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
                          id="tanggalAkhirLimit"
                          minDate={tanggalMulaiLimit}
                          minDateMessage={'Tanggal harus setelah tanggal mulai Limit'}
                          label="Sampai"
                          value={tanggalAkhirLimit}
                          onChange={handletanggalAkhirLimitChange}
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
                          label="Sisa Limit"
                          value={values.sisaLimit}
                          onChange={handleChange}
                          name="sisaLimit"
                          id="sisaLimit" 
                          required={true}
                          variant="outlined"
                          disabled
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
                              <AlertTitle>Update Mitra Data Failed</AlertTitle>
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
                startIcon={<SaveRoundedIcon />}
                disabled={
                  values.targetUnit === 0 || 
                  values.targetNominal === 0 || 
                  values.maksimalLimit === 0 ||
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
            <Typography variant="h2">Hapus data mitra ini?</Typography>
          </div>
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
          <Button variant="contained" className={classes.buttons} onClick={deleteDataMitra} color="primary" autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
            
    </Fragment>
  );
}

MitraList.propTypes = {
  className: PropTypes.string,
  mitra: PropTypes.any
};

export default MitraList;
