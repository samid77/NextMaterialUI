import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

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

export default function ListEligible() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify="center">
        <Grid item>
          <img src={'/images/under_construction.svg'} />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Typography variant="h2">List Eligible</Typography>
        </Grid>
      </Grid>
    </div>
  );
}