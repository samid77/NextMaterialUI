import React, { Fragment, useStyle, useState, useEffect } from 'react';
import axios from 'axios';
import { ProdukToolbar } from '../components/ProdukToolbar';
import { ProdukList } from '../components/ProdukList';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export default function Produk() {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
          <ProdukToolbar />
          <div className={classes.content}>
            <ProdukList />
          </div>
        </div>
    );
}