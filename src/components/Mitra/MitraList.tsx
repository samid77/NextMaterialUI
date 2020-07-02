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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Chip from '@material-ui/core/Chip';
import { yellow, red } from '@material-ui/core/colors';
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
import { useDispatch } from 'react-redux';
import { MitraData } from '../../interfaces/MitraData';
import { updateMitraData, deleteMitraData } from '../../redux/actions/MitraDataAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputMask from 'react-input-mask';
import NumberFormat from 'react-number-format';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

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
  buttons: {},
  tableRow: {},
  dialogAction: {},
}));

interface NamaMitraType {
  nama: string;
}

interface NumberProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatTargetNominal = (props: NumberProps) =>  {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          return formattedValue === "" || floatValue <= 999999999;
      }}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={'.'}
      decimalSeparator={','}
      isNumericString
      allowLeadingZeros={false}
      defaultValue={0}
      allowNegative={false}
      prefix="Rp. "
    />
  );
}

const NumberFormatMaximalLimit = (props: NumberProps) =>  {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          return formattedValue === "" || floatValue <= 999999999;
      }}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={'.'}
      decimalSeparator={','}
      isNumericString
      allowLeadingZeros={false}
      defaultValue={0}
      allowNegative={false}
      prefix="Rp. "
    />
  );
}

const NumberFormatTargetUnit = (props: NumberProps) =>  {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          return formattedValue === "" || floatValue <= 999999999;
      }}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={'.'}
      decimalSeparator={','}
      isNumericString
      allowLeadingZeros={false}
      defaultValue={0}
      allowNegative={false}
      suffix=" unit"
    />
  );
}

const daftarMitra = [
  { nama: 'Bank Negara Indonesia - BNI'},
  { nama: 'Bank Central Asia - BCA'},
  { nama: 'Bank DKI'},
  { nama: 'Bank OCBC NISP'},
  { nama: 'Bank Tabungan Negara - BTN'}
];

let totalData = 0;
const validateMitraProps = (val) => {
  if(typeof(val) === 'object') {
    return totalData = Object.keys(val).length
  } else {
    return totalData;
  }
}

export function MitraList(props) {
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

  const { className, mitra, ...rest } = props;
  validateMitraProps(mitra);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [deleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showProgress, setShowProgress] = useState(true);
  const [page, setPage] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [mitraId, setMitraId] = useState(0);
  const [openForm, setOpenForm] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [namamitra, setNamaMitra] = React.useState<any | null>(daftarMitra[0]);
  const [values, setValues] = useState(defaultValues);

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

  const [pksStartDate, setPksStartDate] = React.useState(new Date());
  const handlePksStartDateChange = (date: Date | null) => {
    setPksStartDate(date);
    values.pksStartDate = date.toString();
    values.tanggalPKS = date.toString();
  };
  const [pksEndDate, setPksEndDate] = React.useState(new Date());
  const handlePksEndDateChange = (date: Date | null) => {
    setPksEndDate(date);
    values.pksEndDate = date.toString();
  };
  const [limitStartDate, setLimitStartDate] = React.useState(new Date());
  const handleLimitStartDateChange = (date: Date | null) => {
    setLimitStartDate(date);
    values.limitStartDate = date.toString();
    values.tanggalLimit = date.toString();
  };
  const [limitEndDate, setLimitEndDate] = React.useState(new Date());
  const handleLimitEndDateChange = (date: Date | null) => {
    setLimitEndDate(date);
    values.limitEndDate = date.toString();
  };

  const parseTargetUnit = (tgrunit) => {
      return tgrunit.toString().split('').reverse().join('').match(/.{1,3}/g).map(function(x){
          return x.split('').reverse().join('')
      }).reverse();
  }

  const openFormModal = (currentMitra) => {
    values.id = currentMitra.id;
    setMitraId(currentMitra.id);
    const indexMitra = daftarMitra.findIndex(d => d.nama === currentMitra.nama);
    setNamaMitra(daftarMitra[indexMitra]);
    values.nama = daftarMitra[indexMitra].nama;
    values.targetNominal = currentMitra.targetNominal;
    values.targetUnit = currentMitra.targetUnit;
    values.maxLimit = currentMitra.maxLimit;
    values.tanggalPKS = currentMitra.pksStartDate;
    values.pksStartDate = currentMitra.pksStartDate;
    setPksEndDate(currentMitra.pksEndDate);
    values.pksEndDate = currentMitra.pksEndDate;
    values.tanggalLimit = currentMitra.limitStartDate;
    values.limitStartDate = currentMitra.limitStartDate;
    values.limitEndDate = currentMitra.limitEndDate;
    setLimitEndDate(currentMitra.limitEndDate);
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

  const currency = new Intl.NumberFormat('in-IN', {
    style: 'currency',
    currency: 'IDR',
  });

  const updateData = () => {
    values.nama = namamitra.nama;
    values.targetUnit = parseInt(values.targetUnit.toString().split(' '). join(''));
    values.targetNominal = parseInt(values.targetNominal.toString().split(' '). join(''));
    values.maxLimit = parseInt(values.maxLimit.toString().split(' '). join(''));
    try {
      dispatch(updateMitraData(values));
      setSuccessAlert(true);
      setOpenForm(false);
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
                        <TableCell className={classes.tableClass}>Nama</TableCell>
                        <TableCell className={classes.tableClass}>Tanggal PKS</TableCell>
                        <TableCell className={classes.tableClass}>Tanggal Limit</TableCell>
                        <TableCell className={classes.tableClass}>Target Unit</TableCell>
                        <TableCell className={classes.tableClass}>Target Nominal</TableCell>
                        <TableCell className={classes.tableClass}>Maksimal Limit</TableCell>
                        <TableCell className={classes.tableClass}>Approval Status</TableCell>
                        <TableCell className={classes.tableClass}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {showProgress 
                        ? <TableRow>
                            <TableCell align="center" colSpan={8} rowSpan={5}>
                              <CircularProgress />
                            </TableCell>
                          </TableRow> 
                        : mitra.slice(0, rowsPerPage).map(m => (
                        <TableRow
                            className={classes.tableRow}
                            hover
                            key={m.id}
                        >
                          <TableCell>
                            <div className={classes.nameContainer}>
                                <Typography variant="body1" className={classes.tableDataClass}>{m.nama}</Typography>
                            </div>
                          </TableCell>
                          <TableCell className={classes.tableDataClass}>{m.tanggalPKS.substring(0,10)}</TableCell>
                          <TableCell className={classes.tableDataClass}>{m.tanggalLimit.substring(0,10)}</TableCell>
                          <TableCell className={classes.tableDataClass}>{parseTargetUnit(m.targetUnit).join('.')}</TableCell>
                          <TableCell className={classes.tableDataClass}>{currency.format(m.targetNominal)}</TableCell>
                          <TableCell className={classes.tableDataClass}>{currency.format(m.maxLimit)}</TableCell>
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
                        minDate={pksStartDate}
                        minDateMessage={'Tanggal harus setelah tanggal mulai PKS'}
                        label="Sampai"
                        value={pksEndDate}
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
                        minDate={limitStartDate}
                        minDateMessage={'Tanggal harus setelah tanggal mulai Limit'}
                        label="Sampai"
                        value={limitEndDate}
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
                            inputComponent: NumberFormatTargetUnit as any,
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
                            inputComponent: NumberFormatTargetNominal as any,
                          }} />
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
              disabled={
                values.targetUnit === 0 || 
                values.targetNominal === 0 || 
                values.maxLimit === 0 }
              onClick={updateData}>
              Update Data
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        open={deleteConfirm}
        onClose={closeDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h2">Hapus data mitra ini?</Typography>
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
