import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { EligibleList } from '../components/EligibleList';
import { LatestSales } from '../components/LatestSales';
import { UsersByDevice } from '../components/UsersByDevice';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

export default function Eligible() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <EligibleList />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <LatestSales />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <UsersByDevice />
            </Grid>
          </Grid>
        </div>
    )
}