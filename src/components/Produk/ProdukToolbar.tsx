import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SearchInputCustom } from '../General';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import SweetAlert from 'react-bootstrap-sweetalert';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import {
  CardContent,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { ProdukData, ProdukDataListState } from '../../interfaces/ProdukData';
import { addProdukData, searchProdukData, resetSearchProdukData } from '../../redux/actions/ProdukDataAction';
import { colors } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme:Theme) => ({
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
  searchInput: {
    marginRight: theme.spacing(1)
  },
  buttons: {
    margin: theme.spacing(1)
  },
  produkAdvanceSearch: {
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
    marginBottom: theme.spacing(-4)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: colors.blueGrey[600],
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
}));
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

const NumberFormatsukuBunga = (props: NumberFormatCustomProps) =>  {
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

interface NamaProdukType {
  id: string;
  namaFiturProduk: string;
}
interface TipeProdukType {
  id: string;
  namaTipeProduk: string;
}


export function ProdukToolbar(props) {
  const defaultVal: ProdukData = {
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

  const dispatch = useDispatch();
  const { className, fiturproduk, tipeproduk, ...rest } = props;
  const produkDataState: ProdukDataListState = useSelector((state: AppState) => state.produkData);
  const [openForm, setOpenForm] = React.useState(false);
  const [openAdvanceSearch, setOpenAdvanceSearch] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [namaproduk, setNamaProduk] = useState(null);
  const [tipeProduk, setTipeProduk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const openFormModal = () => {
    setLoading(false);
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

  const [values, setValues] = useState(defaultVal);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSearch = event => {
    dispatch(searchProdukData(event.target.value))
  }

  const addProduk = () => {
    values.idFiturProduk = namaproduk.id
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
        dispatch(addProdukData(values));
        if(produkDataState.response === 400 || produkDataState.response === 500) {
          setErrorAlert(true);
          setLoading(false)
        } else {
          setErrorAlert(false);
          setOpenForm(false);
          setLoading(false);
          setSuccessAlert(true);
        }
      }, 2000);
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
                onClick={() => setSuccessAlert(false)}>
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
          dispatchFunc={resetSearchProdukData('')}
          placeholder="Cari Produk"/>
        <span className={classes.spacer} />
        <Button
          variant="contained"
          className={classes.produkAdvanceSearch}
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
          <a style={{color: "white", textDecoration: "none"}}>Tambah Produk</a>
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={openForm}
        onClose={closeFormModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="tambahdataProduk">
          <MuiDialogTitle disableTypography className={classes.dialogTitleSection}>
            <Typography variant="h5">Tambah Data Produk</Typography>
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
                    options={tipeproduk}
                    getOptionLabel={(option: TipeProdukType) => option.namaTipeProduk}
                    value={tipeProduk}
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
                    error={values.namaSegmen === ''}
                    helperText={
                      values.namaSegmen === '' ? 'Nama segment tidak boleh kosong' : null
                    }
                    type="text" 
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
                      inputComponent: NumberFormatsukuBunga as any,
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
                {errorAlert 
                  ? <Alert severity="error">
                      <AlertTitle>Add Produk Data Failed</AlertTitle>
                      {produkDataState.error.msg}
                    </Alert> 
                  : null}
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <div className={classes.wrapper}>
            <Button
              color="secondary"
              variant="contained"
              disabled={
                values.namaSegmen === '' || 
                values.namaSegmen === null || 
                values.penghasilanDari === 0 || 
                values.penghasilanSampai === 0 || 
                values.plafon === 0 || 
                values.sukuBunga === 0 ||
                values.tenor === 0 || 
                loading}
              startIcon={<SaveRoundedIcon />}
              onClick={addProduk}>
              Simpan Data
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>

      {/* <Dialog
        fullScreen={fullScreen}
        open={openAdvanceSearch}
        onClose={closeSearchModal}
        fullWidth={true}
        maxWidth={'sm'}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="alert-dialog-title">{"Cari Data Produk"}</DialogTitle>
        <DialogContent>
          <form autoComplete="off" noValidate>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={fiturproduk.map((p) => p.namaFiturProduk)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nama Produk"
                      margin="dense"
                      variant="outlined"
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={tipeProduk.map((t) => t.tipe)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nama Tipe"
                      margin="dense"
                      variant="outlined"
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSearchModal} color="primary" autoFocus>
            Search
          </Button>
        </DialogActions>
      </Dialog> */}

    </div>
  );
}

ProdukToolbar.propTypes = {
  className: PropTypes.string,
  fiturproduk: PropTypes.any,
  tipeproduk: PropTypes.any
};

export default ProdukToolbar;
