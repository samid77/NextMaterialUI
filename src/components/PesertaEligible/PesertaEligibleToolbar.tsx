import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { makeStyles, Theme, colors, Typography, Breadcrumbs, Link, Divider, Button, Collapse, Paper, Grid, TextField, CircularProgress } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import { red, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import { SearchInputCustom } from '../General';
import { resetSearchPesertaEligible, searchPesertaEligible, searchAdvPesertaEligible, exportCSVPesertaEligible, exportExcelPesertaEligible } from '../../redux/actions/PesertaEligibleAction';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { PesertaEligibleFilter, PesertaEligibleListState } from '../../interfaces/PesertaEligible';
import { AppState } from '../../redux/reducers';
import { Alert, AlertTitle } from '@material-ui/lab';

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
		margin: theme.spacing(1),
		backgroundColor: '#4a9667',
		'&:hover': {
				backgroundColor: '#38664a',
		},
	},
	advanceSearch: {
		margin: theme.spacing(1),
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: '#4a9667',
		'&:hover': {
				backgroundColor: '#38664a',
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
	advancedSearchRow: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	searchPaper: {
		padding: theme.spacing(4)
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: colors.blueGrey[600],
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
	divider: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(3),
		backgroundColor: '#cee0d4'
	},
	filterTitle: {
		marginBottom: theme.spacing(2)
	}
}));

export function PesertaEligibleToolbar(props) {

	// filter values
	const filterValues: PesertaEligibleFilter = {
		nomorPesertaFilter: '',
		namaPesertaFilter: '',
		alamatFilter: '',
		nomorTeleponFilter: '',
		pemberiKerjaFilter: '',
	}

	const dispatch = useDispatch();
	const { className, ...rest } = props;
	const pesertaEligibleState: PesertaEligibleListState = useSelector((state: AppState) => state.pesertaEligible);
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [filterForm, setFilterForm] = useState(false);
	const [filterVal, setFilterVal] = useState(filterValues);
	
	const toggleFilterForm = () => {
    	setFilterForm((prev) => !prev);
	};

	const handleChangeFilter = event => {
		setFilterVal({
		...filterVal,
		[event.target.name]: event.target.value
		});
	};

	const handleSearch = event => {
		dispatch(searchPesertaEligible(event.target.value))
	}
	
	const searchAdvancePesertaEligible = () => {
		try {
			setLoading(true);
			dispatch(searchAdvPesertaEligible(filterVal));
			setErrorAlert(false);
			setOpenForm(false);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			console.error(err.message);
		}
	};

	const exportCSV = () => {
    	dispatch(exportCSVPesertaEligible(''))
  	}

	const exportExcel = () => {
		dispatch(exportExcelPesertaEligible(''))
	}

	return (
		<Fragment>
			<div {...rest} className={clsx(classes.root, className)}>
				<div className={classes.row}>
					<Typography variant="h2">Peserta Eligible</Typography>
				</div>
				<div className={classes.row}>
					<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
						<Link color="inherit" href="/" onClick={() => {}}>
							Pemanfaatan Dana
						</Link>
						<Link color="inherit" href="/getting-started/installation/" onClick={() => {}}>
							Peserta
						</Link>
						<Typography color="textPrimary">Eligible</Typography>
					</Breadcrumbs>
				</div>
				<Divider className={classes.divider}/>
				<div className={classes.advancedSearchRow}>
					<Collapse in={filterForm}> 
						<Paper className={classes.searchPaper} elevation={3}>
							<div className={classes.filterTitle}>
								<Typography variant="h4">Filter Data Peserta Eligible</Typography>
								<Divider />
							</div>
							<form autoComplete="off" noValidate>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid container spacing={3}>
										<Grid item xs={4}>
											<TextField
												label="No Peserta"
												value={filterVal.nomorPesertaFilter}
												onChange={handleChangeFilter}
												name="nomorPesertaFilter"
												id="nomorPesertaFilter" 
												variant="outlined"
												margin="dense"
												fullWidth
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="Nomor Ponsel"
												value={filterVal.nomorTeleponFilter}
												onChange={handleChangeFilter}
												name="nomorTeleponFilter"
												id="nomorTeleponFilter" 
												variant="outlined"
												margin="dense"
												fullWidth
											/>
										</Grid>
										<Grid item xs={4}></Grid>
										<Grid item xs={4}>
											<TextField
												label="Nama Peserta"
												value={filterVal.namaPesertaFilter}
												onChange={handleChangeFilter}
												name="namaPesertaFilter"
												id="namaPesertaFilter" 
												variant="outlined"
												margin="dense"
												fullWidth
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="Alamat"
												value={filterVal.alamatFilter}
												onChange={handleChangeFilter}
												name="alamatFilter"
												id="alamatFilter" 
												variant="outlined"
												margin="dense"
												fullWidth
											/>
										</Grid>
										<Grid item xs={4}></Grid>
										<Grid item xs={4}>
											<TextField
												label="Pemberi Kerja"
												value={filterVal.pemberiKerjaFilter}
												onChange={handleChangeFilter}
												name="pemberiKerjaFilter"
												id="pemberiKerjaFilter" 
												variant="outlined"
												margin="dense"
												fullWidth
											/>
										</Grid>
										<Grid item xs={8}></Grid>
										<Grid item xs={6}>
											<div className={classes.wrapper}>
												<Button
													size="medium"
													disableElevation
													variant="contained"
													disabled={loading}
													className={classes.advanceSearch}
													onClick={searchAdvancePesertaEligible}>
													<a style={{color: "white", textDecoration: "none"}}>Cari</a>
													{loading && <CircularProgress size={24} className={classes.buttonProgress} />}
												</Button>
												<Button
													size="medium"
													disableElevation
													variant="contained"
													disabled={loading}
													className={classes.advanceSearch}
													onClick={toggleFilterForm}>
													<a style={{color: "white", textDecoration: "none"}}>Tutup</a>
												</Button>
											</div>
										</Grid>
										<Grid item md={12} xs={12}>
                      {errorAlert 
                        ? <Alert severity="error">
                            <AlertTitle>Filter Data Peserta Eligible Failed</AlertTitle>
                            {pesertaEligibleState.error != null ? pesertaEligibleState.error.msg : "something wrong in our server"}
                          </Alert> 
                        : null}
                      </Grid>
									</Grid>
								</MuiPickersUtilsProvider>
							</form>
						</Paper>
					</Collapse>
				</div>
				<div className={classes.row}>
					<SearchInputCustom
						className={classes.searchInput}
						onKeyUp={handleSearch}
						dispatchFunc={resetSearchPesertaEligible('')}
						placeholder="Cari Peserta Eligible"/>
					<span className={classes.spacer} />
					<Button
						size="small"
						disableElevation
						variant="contained"
						className={classes.advanceSearch}
						startIcon={<PageviewRoundedIcon />}
						onClick={toggleFilterForm}
						>
						<a style={{color: "white", textDecoration: "none"}}>Advanced Search</a>
					</Button>
					<Button
						size="small"
						disableElevation
						variant="contained"
						className={classes.buttons}
						onClick={exportCSV}
						startIcon={<PublishRoundedIcon style={{ color: '#FFFFFF' }}/>}>
						<a style={{color: "white", textDecoration: "none"}}>Export to CSV</a>
					</Button>
					<Button
						size="small"
						disableElevation
						variant="contained"
						className={classes.buttons}
						onClick={exportExcel}
						startIcon={<PublishRoundedIcon style={{ color: '#FFFFFF' }}/>}>
						<a style={{color: "white", textDecoration: "none"}}>Export to Excel</a>
					</Button>
				</div>
			</div>
		</Fragment>
	);
}

PesertaEligibleToolbar.propTypes = {
  className: PropTypes.string,
};

export default PesertaEligibleToolbar;