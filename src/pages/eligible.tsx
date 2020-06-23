import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { EligibleList, ChartEligible } from '../components/Eligible';


const useStyles = makeStyles((theme:any) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

export default function Eligible() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EligibleList />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <ChartEligible />
            </Grid>
          </Grid>
        </div>
    )
}