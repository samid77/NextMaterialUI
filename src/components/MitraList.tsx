import React, { useState } from 'react';
import clsx from 'clsx';
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
  }
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
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
                            <TableCell>{m.approvalStatus}</TableCell>
                            <TableCell>
                                <div>
                                    <IconButton aria-label="delete">
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
  );
};

MitraList.propTypes = {
  className: PropTypes.string,
  mitra: PropTypes.array.isRequired
};

export default MitraList;
