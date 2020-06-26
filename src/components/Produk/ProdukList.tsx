import React, { useState, Fragment, useEffect } from 'react';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
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
import { yellow, red } from '@material-ui/core/colors';
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
import InputMask from 'react-input-mask';
import { useDispatch } from 'react-redux';
import { ProdukData } from '../../interfaces/ProdukData';
import { updateProdukData, deleteProdukData } from '../../redux/actions/ProdukDataAction';

const useStyles = makeStyles((theme:any) => ({
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
  buttons: {},
  tableRow: {},
  dialogContent: {},
  dateLabel: {},
  dialogAction: {}
}));

interface NamaProdukType {
  nama: string;
}
interface TipeProdukType {
  nama: string;
}

const daftarProduk = [
  { nama: 'KPR'},
  { nama: 'KRR'},
  { nama: 'KBR'},
];
const tipeProduk = [
  { nama: 'Syariah'},
  { nama: 'Konvensional'},
];

export function ProdukList(props) {
  const defaultVal: ProdukData = {
    id: '',
    idFiturProduk: '',
    namaFiturProduk:'',
    idTipeProduk: '',
    namaTipeproduk:'',
    namaSegmen:'',
    penghasilanDari: 0,
    penghasilanSampai: 0,
    plafon:0,
    sukubunga:0,
    tenor:0,
    idStatusPersetujuan: '',
    statusPersetujuan:'Approved',
    created_at: '',
    created_by: '',
    updated_at: '',
    updated_by: '',
    checked_at: '',
    checked_by: '',
    approved_at: '',
    approved_by: ''
  };

  const { className, produk, ...rest } = props;
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
  const [namaproduk, setNamaProduk] = useState(daftarProduk[0]);
  const [tipeproduk, setTipeProduk] = useState(tipeProduk[0]);
  const [values, setValues] = useState<ProdukData>(defaultVal);

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
    const indexProduk = daftarProduk.findIndex(d => d.nama === currentProduct.namaFiturProduk);
    const indexTipe = tipeProduk.findIndex(t => t.nama === currentProduct.namaTipeproduk);
    setNamaProduk(daftarProduk[indexProduk]);
    setTipeProduk(tipeProduk[indexTipe]);

    values.namaSegmen = currentProduct.namaSegmen;
    values.penghasilanDari = currentProduct.penghasilanDari;
    values.penghasilanSampai = currentProduct.penghasilanSampai;
    values.plafon = currentProduct.plafon;
    values.sukubunga = currentProduct.sukubunga;
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
      dispatch(deleteProdukData(produkId));
      setDeleteSuccess(true);
      setOpenDeleteConfirm(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  const updateData = () => {
    values.namaFiturProduk = namaproduk.nama;
    values.namaTipeproduk = tipeproduk.nama;
    values.penghasilanDari = parseInt(values.penghasilanDari.toString().split(' ').join(''));
    values.penghasilanSampai = parseInt(values.penghasilanSampai.toString().split(' ').join(''));
    values.plafon = parseInt(values.plafon.toString().split(' ').join(''));
    values.sukubunga = parseInt(values.sukubunga.toString().split(' ').join(''));
    values.tenor = parseInt(values.tenor.toString().split(' ').join(''));
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
        <DialogActions>
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
                    options={daftarProduk}
                    getOptionLabel={(option: NamaProdukType) => option.nama}
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
                    options={tipeProduk}
                    getOptionLabel={(option: TipeProdukType) => option.nama}
                    value={tipeproduk}
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
}

ProdukList.propTypes = {
  className: PropTypes.string,
  produk: PropTypes.any
};

export default ProdukList;
