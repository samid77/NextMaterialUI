import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
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
  TablePagination
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
import MUIDataTable from 'mui-datatables';

// import { getInitials } from '../helpers/getInitials';

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

const getInitials = (name = '') => {
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map(v => v && v[0].toUpperCase())
    .join('');
}

export function MitraList(props) {
  const { className, mitra, ...rest } = props;

  const classes = useStyles();
  const [deleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log(`useEffect mitra list called`)
  }, [])

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const openDeleteConfirm = () => {
    setOpenDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  return (
    <Fragment>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <TableContainer>
                  <Table stickyHeader>
                      <TableHead>
                          <TableRow>
                          <TableCell>Nama</TableCell>
                          <TableCell>Tanggal PKS</TableCell>
                          <TableCell>Tanggal Limit</TableCell>
                          <TableCell>Target Unit</TableCell>
                          <TableCell>Target Nominal</TableCell>
                          <TableCell>Maksimal Limit</TableCell>
                          <TableCell>Approval Status</TableCell>
                          <TableCell>Actions</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {mitra.slice(0, rowsPerPage).map(m => (
                          <TableRow
                              className={classes.tableRow}
                              hover
                              key={m.id}
                          >
                              <TableCell>
                              <div className={classes.nameContainer}>
                                  <Typography variant="body1">{m.nama}</Typography>
                              </div>
                              </TableCell>
                              <TableCell>{m.tanggalPKS}</TableCell>
                              <TableCell>{m.tanggalLimit}</TableCell>
                              <TableCell>{m.targetUnit}</TableCell>
                              <TableCell>{m.targetNominal}</TableCell>
                              <TableCell>{m.maxLimit}</TableCell>
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
                                      <IconButton onClick={openDeleteConfirm} aria-label="delete">
                                          <DeleteIcon />
                                      </IconButton>
                                      <IconButton aria-label="edit">
                                          <EditRoundedIcon />
                                      </IconButton>
                                      <IconButton aria-label="view" color="primary">
                                          <VisibilityRoundedIcon />
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
            count={mitra.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <Dialog
        open={deleteConfirm}
        onClose={closeDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hapus data mitra ini?"}</DialogTitle>
        <DialogActions>
          <Button onClick={closeDeleteConfirm} color="primary">
            Batal
          </Button>
          <Button onClick={closeDeleteConfirm} color="primary" autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

MitraList.propTypes = {
  className: PropTypes.string,
  mitra: PropTypes.array.isRequired
};

export default MitraList;
