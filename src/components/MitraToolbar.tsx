import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { green, purple, red } from '@material-ui/core/colors';
import { SearchInputCustom } from './SearchInputCustom';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';

const useStyles = makeStyles(theme => ({
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
    margin: theme.spacing(1)
  },
  advanceSearch: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[700],
    },
  },
}));

export function MitraToolbar(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {/* <div className={classes.row}>
        
      </div> */}
      <div className={classes.row}>
        <SearchInputCustom
          className={classes.searchInput}
          placeholder="Cari Mitra"
        />
        <span className={classes.spacer} />
        <Button
            variant="contained"
            className={classes.advanceSearch}
            startIcon={<PageviewRoundedIcon />}
        >
            <Link href="/form">
                <a style={{color: "white", textDecoration: "none"}}>Advanced Search</a>
            </Link>
        </Button>
        <Button
            color="primary"
            variant="contained"
            className={classes.buttons}
            startIcon={<PublishRoundedIcon />}
        >
            <Link href="/form">
                <a style={{color: "white", textDecoration: "none"}}>Export to CSV</a>
            </Link>
        </Button>
        <Button
            color="secondary"
            variant="contained"
            className={classes.buttons}
            startIcon={<AddCircleOutlineRoundedIcon />}
        >
            <Link href="/form">
                <a style={{color: "white", textDecoration: "none"}}>Add Mitra</a>
            </Link>
        </Button>
      </div>
    </div>
  );
};

MitraToolbar.propTypes = {
  className: PropTypes.string
};

export default MitraToolbar;
