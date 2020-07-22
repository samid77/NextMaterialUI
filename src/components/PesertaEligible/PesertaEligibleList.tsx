import PropTypes from 'prop-types';
import { Fragment, useState, useEffect } from 'react';
import { makeStyles, Theme, Card, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Typography, CardActions, TablePagination } from '@material-ui/core';
import { red, green, yellow } from '@material-ui/core/colors';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isEmpty } from 'validate.js';
import { isNullOrUndefined } from 'util';

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
  tanggalProses : {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export function PesertaEligibleList(props) {
	const { className, pesertaEligible, ...rest } = props;
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [showProgress, setShowProgress] = useState(true);

  let totalData = pesertaEligible.TotalResult;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(false)
    }, 2000);
    return () => clearTimeout(timer);
  }, [])
  
  const handlePageChange = (event, chosenPage) => {
    setPage(chosenPage);
  };
  
  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
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
    
    let processDate = "";
    if(typeof(pesertaEligible) === 'object') {
      processDate = isNullOrUndefined(pesertaEligible.Result) == true ? "-" : 
        displayDate(pesertaEligible.Result[0].ProcessDate.substring(0,10));
    }

    return (
    <Fragment>
      <div className={classes.tanggalProses}>
        <Typography variant="h4">
          Tanggal Proses: {processDate}
        </Typography>
      </div>
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
                      <TableCell className={classes.tableClass}>No Peserta</TableCell>
                      <TableCell className={classes.tableClass}>Nama Peserta</TableCell>
                      <TableCell className={classes.tableClass}>Pemberi Kerja</TableCell>
                      <TableCell className={classes.tableClass}>No Ponsel</TableCell>
                      <TableCell className={classes.tableClass}>Alamat</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showProgress
                      ? <TableRow>
                          <TableCell align="center" colSpan={8} rowSpan={5}>
                            <CircularProgress />
                          </TableCell>
                      </TableRow>
                      : pesertaEligible === null || isEmpty(pesertaEligible.Result) ? <TableRow>
                        <TableCell align="center" colSpan={8} rowSpan={5}>
                            <img src={'/images/nodata.jpg'} height="400" width="400"/>
                          </TableCell>
                      </TableRow>
                      : pesertaEligible.Result.slice(0, rowsPerPage).map(m => (
                        <TableRow className={classes.tableRow} hover key={m.id}>
                          <TableCell className={classes.tableDataClass}> {m.nomorPeserta} </TableCell>
                          <TableCell className={classes.tableDataClass}> {m.namaPeserta} </TableCell>
                          <TableCell className={classes.tableDataClass}> {m.pemberiKerja} </TableCell>
                          <TableCell className={classes.tableDataClass}> {m.nomorTelepon} </TableCell>
                          <TableCell className={classes.tableDataClass}> {m.alamat} </TableCell>
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
		</Fragment>
	);
}

PesertaEligibleList.propTypes = {
  className: PropTypes.string,
  pesertaEligible: PropTypes.any
};

export default PesertaEligibleList;