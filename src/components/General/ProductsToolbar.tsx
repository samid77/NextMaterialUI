import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { SearchInput } from './SearchInput';


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
  }
}));

export function ProductsToolbar(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add product
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
        />
      </div>
    </div>
  );
}

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

export default ProductsToolbar;
