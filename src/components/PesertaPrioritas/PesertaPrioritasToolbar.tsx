import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { makeStyles, Theme, colors, Typography, Breadcrumbs, Link, Divider, Button, Collapse, Paper, Grid, TextField, CircularProgress } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';
import { red, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import { SearchInputCustom } from '../General';
import { resetSearchPesertaPrioritas, searchPesertaPrioritas, searchAdvPesertaPrioritas, exportCSVPesertaPrioritas, exportExcelPesertaPrioritas } from '../../redux/actions/PesertaPrioritasAction';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { PesertaPrioritasFilter, PesertaPrioritasListState } from '../../interfaces/PesertaPrioritas';
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

export function PesertaPrioritasToolbar(props) {

	const filterValues: PesertaPrioritasFilter = {
		noPesertaFilter: '',
		namaPesertaFilter: '',
		alamatFilter: '',
		noPonselFilter: '',
		pemberiKerjaFilter: '',
		skorFilter: ''
	}

	const dispatch = useDispatch();
	const { className, ...rest } = props;
	const pesertaPrioritasState: PesertaPrioritasListState = useSelector((state: AppState) => state.pesertaPrioritas);
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
		dispatch(searchPesertaPrioritas(event.target.value))
	}
	
	const searchAdvancePesertaPrioritas = () => {
		console.log(JSON.stringify(filterVal));
		try {
			setLoading(true);
			dispatch(searchAdvPesertaPrioritas(filterVal));
			setErrorAlert(false);
			setOpenForm(false);
			setLoading(false);
		} catch (err) {	
			setLoading(false);
			console.error(err.message);
		}
	};

	const exportCSV = () => {
    	dispatch(exportCSVPesertaPrioritas(''))
  	}

  	const exportExcel = () => {
    	dispatch(exportExcelPesertaPrioritas(''))
  	}

	return (
		<Fragment>
			<div {...rest} className={clsx(classes.root, className)}>
				<div className={classes.row}>
					<Typography variant="h2">Peserta Prioritas</Typography>
				</div>
				<div className={classes.row}>
					<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
						<Link color="inherit" href="/" onClick={() => {}}>
							Pemanfaatan Dana
						</Link>
						<Link color="inherit" href="/" onClick={() => {}}>
							Peserta
						</Link>
						<Typography color="textPrimary">Prioritas</Typography>
					</Breadcrumbs>
				</div>
				<Divider className={classes.divider}/>
				<div className={classes.advancedSearchRow}>
					<Collapse in={filterForm}> 
						<Paper className={classes.searchPaper} elevation={3}>
							<div className={classes.filterTitle}>
								<Typography variant="h4">Filter Data Peserta Prioritas</Typography>
								<Divider />
							</div>
							<form autoComplete="off" noValidate>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid container spacing={3}>
										<Grid item xs={4}>
											<TextField
												label="No Peserta"
												value={filterVal.noPesertaFilter}
												onChange={handleChangeFilter}
												name="noPesertaFilter"
												id="noPesertaFilter" 
												variant="outlined"
												margin="dense"
												fullWidth
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												label="Nomor Ponsel"
												value={filterVal.noPonselFilter}
												onChange={handleChangeFilter}
												name="noPonselFilter"
												id="noPonselFilter" 
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
										<Grid item xs={4}>
											<TextField
												label="Skor"
												value={filterVal.skorFilter}
												onChange={handleChangeFilter}
												name="skorFilter"
												id="skorFilter" 
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
													onClick={searchAdvancePesertaPrioritas}>
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
							<AlertTitle>Filter Data Peserta Prioritas Failed</AlertTitle>
							{pesertaPrioritasState.error != null ? pesertaPrioritasState.error.msg : "something wrong in our server"}
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
						dispatchFunc={resetSearchPesertaPrioritas('')}
						placeholder="Cari Peserta Prioritas"/>
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

PesertaPrioritasToolbar.propTypes = {
  className: PropTypes.string,
};

export default PesertaPrioritasToolbar;