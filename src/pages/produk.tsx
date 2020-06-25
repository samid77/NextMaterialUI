import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { ProdukToolbar, ProdukList } from '../components/Produk';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { ProdukDataListState } from '../interfaces/ProdukData';
import { getProdukData } from '../redux/actions/ProdukDataAction';

const useStyles = makeStyles((theme:any) => ({
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
    const produkDataState: ProdukDataListState = useSelector((state: AppState) => state.produkData);

    useEffect(() => {
      dispatch(getProdukData(''));
      // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
          <ProdukToolbar />
          <div className={classes.content}>
            <ProdukList produk={produkDataState.data }/>
          </div>
        </div>
    );
}