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
import CircularProgress from '@material-ui/core/CircularProgress';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { ProdukDataListState } from '../../interfaces/ProdukData';
import { updateProdukData, getProdukData, deleteProdukData } from '../../redux/actions/ProdukDataAction';

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

interface NamaProdukType {
  idFiturProduk: string;
  nama: string;
}
interface TipeProdukType {
  idTipeProduk: string;
  nama: string;
}

const daftarProduk = [
  { idFiturProduk:'P0001', nama: 'KPR'},
  { idFiturProduk:'P0002', nama: 'KRR'},
  { idFiturProduk:'P0003', nama: 'KBR'},
];
const tipeProduk = [
  { idTipeProduk:'TP0001', nama: 'Syariah'},
  { idTipeProduk:'TP0002', nama: 'Konvensional'},
];

export function ProdukList(props) {
  const { className, produk, ...rest } = props;
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
  const [data, setData] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [idInteger, setIdInteger] = useState(0);
  const [idproduk, setIdProduk] = useState(daftarProduk[0].idFiturProduk);
  const [namaproduk, setNamaProduk] = useState(daftarProduk[0].nama);
  const [idtipeproduk, setIdTipeProduk] = useState(tipeProduk[0].idTipeProduk);
  const [tipeproduk, setTipeProduk] = useState(tipeProduk[0].nama);
  const [values, setValues] = useState({
    id: 0,
    idFiturProduk: '',
    namaFiturProduk:'',
    idTipeProduk: '',
    namaTipeproduk:'',
    namaSegmen:'',
    penghasilanDari:'',
    penghasilanSampai:'',
    plafon:'',
    sukubunga:'',
    tenor:'',
    idStatusPersetujuan: 1,
    statusPersetujuan:'Approved',
    created_at: new Date(),
  });

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

  const openFormModal = (data) => {
    const indexProduk = daftarProduk.findIndex(d => d.nama === data.namaFiturProduk);
    const indexTipe = tipeProduk.findIndex(t => t.nama === data.namaTipeproduk);
    
    values.id = data.id;
    setNamaProduk(daftarProduk[indexProduk]);
    setTipeProduk(tipeProduk[indexTipe]);

    values.namaSegmen = data.namaSegmen;
    values.penghasilanDari = data.penghasilanDari;
    values.penghasilanSampai = data.penghasilanSampai;
    values.plafon = data.plafon;
    values.sukubunga = data.sukubunga;
    values.tenor = data.tenor;
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
    setProdukId(id);
    setOpenDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const deleteDataProduk = () => {
    try {
      dispatch(deleteProdukData(produkId));
      setDeleteSuccess(true);
      setOpenDeleteConfirm(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  const updateData = () => {
    values.namaFiturProduk = namaproduk.nama;
    values.idFiturProduk = namaproduk.idFiturProduk;
    values.idTipeProduk = tipeproduk.idTipeProduk;
    values.namaTipeproduk = tipeproduk.nama;
    values.penghasilanDari = values.penghasilanDari.split(' ').join('');
    values.penghasilanSampai = values.penghasilanSampai.split(' ').join('');values.plafon = values.plafon.split(' ').join('');
    values.sukubunga = values.sukubunga.split(' ').join('');
    values.tenor = values.tenor.split(' ').join('');
    try {
      dispatch(updateProdukData(values));
      setOpenForm(false);
      setSuccessAlert(true);
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
        className={clsx(classes.root, className)}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nama Produk</TableCell>
                        <TableCell>Tipe Produk</TableCell>
                        <TableCell>Nama Segmen</TableCell>
                        <TableCell>Penghasilan</TableCell>
                        <TableCell>Plafon</TableCell>
                        <TableCell>Suku Bunga</TableCell>
                        <TableCell>Tenor</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {showProgress 
                        ? <TableRow>
                            <TableCell align="center" colSpan={8} rowSpan={5}>
                              <CircularProgress />
                            </TableCell>
                          </TableRow> 
                        : produk.slice(0, rowsPerPage).map(p => (
                        <TableRow
                            className={classes.tableRow}
                            hover
                            key={p.id}
                        >
                          <TableCell>
                            <div className={classes.nameContainer}>
                                <Typography variant="body1">{p.namaFiturProduk}</Typography>
                            </div>
                          </TableCell>
                          <TableCell>{p.namaTipeproduk}</TableCell>
                          <TableCell>{p.namaSegmen}</TableCell>
                          <TableCell>{currency.format(p.penghasilanDari) +' ' + ' s/d ' + ' '+ currency.format(p.penghasilanSampai)}</TableCell>
                          <TableCell>{currency.format(p.plafon)}</TableCell>
                          <TableCell>{p.sukubunga}</TableCell>
                          <TableCell>{p.tenor}</TableCell>
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
            count={produk.length}
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
        <DialogActions justify="center" align="center">
          <Button variant="contained"className={classes.buttons} onClick={closeDeleteConfirm} color="secondary">
            Batal
          </Button>
          <Button variant="contained"className={classes.buttons} onClick={deleteDataProduk} color="primary" autoFocus>
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
        <DialogTitle id="tambahdataProduk">Edit Data Produk</DialogTitle>
        <DialogContent className={classes.dialogContent}>
           <form autoComplete="off" noValidate>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <Autocomplete
                    id="namaproduk"
                    autoComplete
                    disableClearable
                    getOptionLabel={(option: NamaProdukType) => option.nama}
                    options={daftarProduk}
                    value={namaproduk}
                    onChange={(event: any, newValue: string | null) => {
                      setNamaProduk(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nama produk"
                        margin="dense"
                        variant="outlined"
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
                    options={tipeProduk}
                    getOptionLabel={(option: TipeProdukType) => option.nama}
                    value={tipeproduk}
                    onChange={(event: any, newValue: string | null) => {
                      setTipeProduk(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tipe Produk"
                        margin="dense"
                        variant="outlined"
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
                    value={values.namaSegmen}
                    onChange={handleChange}
                    variant="outlined"/>
                </Grid>
                <Grid item md={12} xs={12} className={classes.dateLabel}>
                  <Divider />
                  <h3>Penghasilan</h3>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputMask
                    mask="9 999 999"
                    value={values.penghasilanDari}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Dari"
                      margin="dense"
                      name="penghasilanDari"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputMask
                    mask="9 999 999"
                    value={values.penghasilanSampai}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Sampai"
                      margin="dense"
                      name="penghasilanSampai"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputMask
                    mask="9 999 999 999"
                    value={values.plafon}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Plafon"
                      margin="dense"
                      name="plafon"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputMask
                    mask="99" 
                    value={values.sukubunga}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Suku Bunga"
                      margin="dense"
                      name="sukubunga"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputMask
                    mask="99"
                    value={values.tenor}
                    onChange={handleChange}>
                    {() => <TextField
                      fullWidth
                      label="Tenor"
                      margin="dense"
                      name="tenor"
                      required={true}
                      type="text"
                      variant="outlined"/>}
                  </InputMask>
                </Grid>
              </Grid>
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

ProdukList.propTypes = {
  className: PropTypes.string,
};

export default ProdukList;
