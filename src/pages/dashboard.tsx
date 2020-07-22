import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { 
  TotalUsers, 
  TasksProgress, 
  TotalProfit, 
  LatestSales, 
  UsersByDevice, 
  LatestProducts, 
  LatestOrders } from '../components/Dashboard';
import { useDispatch } from 'react-redux';
import { isAnotherPage } from '../redux/actions/LayoutActions';
import Backdrop from '@material-ui/core/Backdrop';


const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Dashboard() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(isAnotherPage(true));
    }, [])

    return(
        <div className={classes.root}>
          <Grid container spacing={4}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalUsers />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalUsers />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TasksProgress />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalProfit />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <LatestSales />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <UsersByDevice />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <LatestProducts />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <LatestOrders />
              </Grid>
          </Grid>
        </div>
    )
}