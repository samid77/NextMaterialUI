import React, { useState, Fragment } from 'react';
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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

  const columns = [
    {
      name: "nama",
      label: "Nama",
      options: {
      filter: true,
      sort: true,
      filterType: 'textField'
      }
    },
    {
      name: "tanggalPKS",
      label: "Tanggal PKS",
      options: {
      filter: true,
      sort: false,
      }
    },
    {
      name: "tanggalLimit",
      label: "Tanggal Limit",
      options: {
      filter: true,
      sort: false,
      }
    },
    // {
    //   name: "tanggalLimit",
    //   label: "Tanggal Limit",
    //   options: {
    //   filter: true,
    //   filterType: 'custom',
    //   filterOptions: {
    //     display: () => (
    //       <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //          <KeyboardDatePicker
    //                     disableToolbar
    //                     variant="inline"
    //                     format="MM/dd/yyyy"
    //                     margin="dense"
    //                     id="date-picker-inline"
    //                     label="Dari"
    //                     value=''
    //                     onChange={() => {}}
    //                     KeyboardButtonProps={{
    //                       'aria-label': 'change date',
    //                     }}
    //                   />
    //       </MuiPickersUtilsProvider>
    //     ),
    //   },
    //   sort: false,
    //   }
    // },
    {
      name: "targetUnit",
      label: "Target Unit",
      options: {
      filter: true,
      sort: false,
      }
    },
    {
      name: "targetNominal",
      label: "Target Nominal",
      options: {
      filter: true,
      sort: false,
      }
    },
    {
      name: "maxLimit",
      label: "Maksimum Limit",
      options: {
      filter: true,
      sort: false,
      }
    },
    {
      name: "targetNominal",
      label: "Target Nominal",
      options: {
      filter: true,
      sort: false,
      }
    },
    {
      name: "approvalStatus",
      label: "Approval Status",
      options: {
      filter: true,
      sort: false,
      filterType: 'dropdown'
      }
    },
  ];

  const options = {
    filterType: 'textField',
  };

  return (
    <Fragment>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <MUIDataTable
            title={"Data Mitra"}
            data={mitra}
            columns={columns}
            options={options}
          />
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
