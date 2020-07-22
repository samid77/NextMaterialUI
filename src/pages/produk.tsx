import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { ProdukToolbar, ProdukList } from '../components/Produk';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { ProdukDataListState } from '../interfaces/ProdukData';
import { getProdukData, getProdukTipeData, getProdukFiturData } from '../redux/actions/ProdukDataAction';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(2)
  },
  grid: {
    height: '100%',
    marginTop: theme.spacing(1)
  },
}));

export default function Produk() {
  const classes = useStyles();
  const produkDataState: ProdukDataListState = useSelector((state: AppState) => state.produkData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProdukData(''));
    dispatch(getProdukFiturData(''));
    dispatch(getProdukTipeData(''));
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <ProdukToolbar fiturproduk={produkDataState.fiturProduk} tipeproduk={produkDataState.tipeProduk} />
      <div className={classes.content}>
        <ProdukList fiturproduk={produkDataState.fiturProduk} tipeproduk={produkDataState.tipeProduk} produk={produkDataState.data}/>
      </div>
    </div>
  );
}