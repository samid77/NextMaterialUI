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
import { ProdukData, ProdukDataListState } from '../../interfaces/ProdukData';
import { updateProdukData, deleteProdukData } from '../../redux/actions/ProdukDataAction';
import NumberFormat from 'react-number-format';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';
import { green } from '@material-ui/core/colors';

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

interface NamaProdukType {
  id: string;
  namaFiturProduk: string;
}
interface TipeProdukType {
  id: string;
  namaTipeProduk: string;
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatPenghasilan = (props: NumberFormatCustomProps) =>  {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          return formattedValue === "" || floatValue <= 999999999;
      }}
      isNumericString
      allowLeadingZeros={false}
      defaultValue={0}
      allowNegative={false}
      prefix="Rp. "
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
    />
  );
}

const NumberFormatTenor = (props: NumberFormatCustomProps) =>  {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          return formattedValue === "" || floatValue <= 40;
      }}
      thousandSeparator={'.'}
      decimalSeparator={','}
      isNumericString
      allowLeadingZeros={false}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      defaultValue={0}
      allowNegative={false}
      suffix=" thn"
    />
  );
}

const NumberFormatSukuBunga = (props: NumberFormatCustomProps) =>  {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          return formattedValue === "" || floatValue <= 99;
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
      allowLeadingZeros={true}
      defaultValue={0}
      allowNegative={false}
      suffix=" %"
    />
  );
}

const NumberFormatPlafon = (props: NumberFormatCustomProps) =>  {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          return formattedValue === "" || floatValue <= 9999999999;
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
      defaultValue={0}
      allowNegative={false}
      prefix="Rp. "
      thousandSeparator={'.'}
      decimalSeparator={','}
      isNumericString
      allowLeadingZeros={true}
    />
  );
}

let totalData = 0;
const validateProdukProps = (val) => {
  if(typeof(val) === 'object') {
    return totalData = Object.keys(val).length
  } else {
    return totalData;
  }
}

export function ProdukList(props) {
  const defaultVal: ProdukData = {
    id: '',
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

  const { className, produk, fiturproduk, tipeproduk, ...rest } = props;
  validateProdukProps(produk);
  const produkDataState: ProdukDataListState = useSelector((state: AppState) => state.produkData);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [deleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showProgress, setShowProgress] = useState(true);
  const [page, setPage] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [produkId, setProdukId] = useState(0);
  const [openForm, setOpenForm] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [namaproduk, setNamaProduk] = useState(null);
  const [tipeProduk, setTipeProduk] = useState(null);
  const [values, setValues] = useState<ProdukData>(defaultVal);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorUpdateAlert, setErrorUpdateAlert] = useState(false);

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

  const openFormModal = (currentProduct) => {
    values.id = currentProduct.id;
    const indexProduk = fiturproduk.findIndex(d => d.namaFiturProduk === currentProduct.namaFiturProduk);
    const indexTipe = tipeproduk.findIndex(t => t.id === currentProduct.idTipeProduk);
    setNamaProduk(fiturproduk[indexProduk]);
    setTipeProduk(tipeproduk[indexTipe]);
    values.idFiturProduk = currentProduct.idFiturProduk;
    values.idTipeProduk = currentProduct.idTipeProduk;
    values.namaTipeProduk = currentProduct.namaTipeProduk;
    values.namaSegmen = currentProduct.namaSegmen;
    values.penghasilanDari = currentProduct.penghasilanDari;
    values.penghasilanSampai = currentProduct.penghasilanSampai;
    values.plafon = currentProduct.plafon;
    values.sukuBunga = currentProduct.sukuBunga;
    values.tenor = currentProduct.tenor;
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
    setProdukId(id);
    setOpenDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const deleteDataProduk = () => {
    try {
      setLoading(true);
      setTimeout(() => {
        dispatch(deleteProdukData(produkId));
        if(produkDataState.response === 400 || produkDataState.response === 500) {
          setOpenDeleteConfirm(false);
          setDeleteSuccess(false);
          setErrorAlert(true);
          setLoading(false)
        } else {
          setErrorAlert(false);
          setDeleteSuccess(true);
          setOpenDeleteConfirm(false);
          setLoading(false);
        }
      }, 2000);
    } catch (error) {
      console.error(error.message);
    }
  }

  const updateData = () => {
    values.idFiturProduk = namaproduk.id;
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
      setTimeout(() => {
        dispatch(updateProdukData(values));
        console.log(`produkDataState: ${JSON.stringify(produkDataState)}`)
        if(produkDataState.response === 400 || produkDataState.response === 500) {
          setErrorUpdateAlert(true);
          setLoading(false)
        } else {
          setErrorUpdateAlert(false);
          setOpenForm(false);
          setLoading(false);
          setSuccessAlert(true);
        }
      }, 2000);
    } catch (err) {
      console.error(err.message);
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
      <SweetAlert success title="Data Produk Updated!" 
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
                        <TableCell className={classes.tableClass}>Nama Produk</TableCell>
                        <TableCell className={classes.tableClass}>Tipe Produk</TableCell>
                        <TableCell className={classes.tableClass}>Nama Segmen</TableCell>
                        <TableCell className={classes.tableClass}>Penghasilan</TableCell>
                        <TableCell className={classes.tableClass}>Plafon</TableCell>
                        <TableCell className={classes.tableClass}>Suku Bunga</TableCell>
                        <TableCell className={classes.tableClass}>Tenor</TableCell>
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
                        : produk.Result.slice(0, rowsPerPage).map(p => (
                        <TableRow className={classes.tableRow} hover key={p.id}>
                          <TableCell>
                            <div className={classes.produkNameContainer}>
                              <Typography variant="body1" className={classes.tableDataClass}>{p.namaFiturProduk}</Typography>
                            </div>
                          </TableCell>
                          <TableCell className={classes.tableDataClass}>{p.namaTipeProduk}</TableCell>
                          <TableCell className={classes.tableDataClass}>{p.namaSegmen}</TableCell>
                          <TableCell className={classes.tableDataClass}>{currency.format(p.penghasilanDari) +' ' + ' s/d ' + ' '+ currency.format(p.penghasilanSampai)}</TableCell>
                          <TableCell className={classes.tableDataClass}>{currency.format(p.plafon)}</TableCell>
                          <TableCell className={classes.tableDataClass}>{p.sukuBunga} %</TableCell>
                          <TableCell className={classes.tableDataClass}>{p.tenor} tahun</TableCell>
                          <TableCell>
                            <div>
                              <IconButton onClick={() => openDeleteConfirm(p.id)} aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                              <IconButton onClick={() => openFormModal(p)} aria-label="edit">
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
            rowsPerPageOptions={[5, 10, 25]}/>
        </CardActions>
      </Card>
      <Dialog
        fullWidth
        open={deleteConfirm}
        onClose={closeDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h2">Hapus data produk ini?</Typography>
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
              color="secondary"
              disabled={loading}>
              Batal
            </Button>
            <Button 
              variant="contained" 
              className={classes.buttons} 
              onClick={deleteDataProduk} 
              color="primary" 
              disabled={loading}
              autoFocus>
              Hapus
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={closeFormModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="editdataProduk">
          <MuiDialogTitle disableTypography className={classes.dialogTitleSection}>
            <Typography variant="h5">Edit Data Produk</Typography>
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
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <Autocomplete
                    id="namaproduk"
                    autoComplete
                    disableClearable
                    options={fiturproduk}
                    getOptionLabel={(option: NamaProdukType) => option.namaFiturProduk}
                    value={namaproduk}
                    onChange={(event: any, newValue: any | null) => {
                      setNamaProduk(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nama produk"
                        margin="dense"
                        variant="outlined"
                        required={true}
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
                    getOptionLabel={(option: TipeProdukType) => option.namaTipeProduk}
                    value={tipeProduk}
                    onChange={(event: any, newValue: any | null) => {
                      setTipeProduk(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tipe Produk"
                        margin="dense"
                        variant="outlined"
                        required={true}
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
                    type="text" 
                    error={values.namaSegmen === ''}
                    helperText={
                      values.namaSegmen === '' ? 'Nama segment tidak boleh kosong' : null
                    }
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
                      inputComponent: NumberFormatPenghasilan as any,
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
                      inputComponent: NumberFormatPenghasilan as any,
                    }}/>
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
                      inputComponent: NumberFormatPlafon as any,
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
                      inputComponent: NumberFormatSukuBunga as any,
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
                      inputComponent: NumberFormatTenor as any,
                    }} />
                </Grid>
                <Grid item md={12} xs={12}>
                {errorUpdateAlert 
                  ? <Alert severity="error">
                      <AlertTitle>Update Produk Data Failed</AlertTitle>
                      {produkDataState.error.msg}
                    </Alert> 
                  : null}
                </Grid>
              </Grid>
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
                  values.namaSegmen === '' || 
                  values.namaSegmen === null || 
                  values.penghasilanDari === 0 || 
                  values.penghasilanSampai === 0 || 
                  values.plafon === 0 || 
                  values.sukuBunga === 0 ||
                  values.tenor === 0 || 
                  loading}
                onClick={updateData}>
                Update Data
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

ProdukList.propTypes = {
  className: PropTypes.string,
  produk: PropTypes.any,
  fiturproduk: PropTypes.any,
  tipeproduk: PropTypes.any
};

export default ProdukList;
