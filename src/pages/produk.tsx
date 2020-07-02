import React, { useEffect } from 'react';
import { ProdukToolbar, ProdukList } from '../components/Produk';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { ProdukDataListState } from '../interfaces/ProdukData';
import { getProdukData, getProdukFiturData, getProdukTipeData } from '../redux/actions/ProdukDataAction';

const useStyles = makeStyles((theme:Theme) => ({
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
      dispatch(getProdukFiturData(''));
      dispatch(getProdukTipeData(''));
      // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
          <ProdukToolbar fiturproduk={produkDataState.fiturProduk} tipeproduk={produkDataState.tipeProduk}/>
          <div className={classes.content}>
            <ProdukList fiturproduk={produkDataState.fiturProduk} tipeproduk={produkDataState.tipeProduk} produk={produkDataState.data }/>
          </div>
        </div>
    );
}