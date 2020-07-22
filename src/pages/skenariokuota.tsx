import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { SkenarioKuotaToolbar, SkenarioKuotaList } from '../components/SkenarioKuota';
import { useSelector, useDispatch } from 'react-redux';
import { SkenarioKuotaListState } from '../interfaces/SkenarioKuota';
import { AppState } from '../redux/reducers';
import { getSkenarioKuota } from '../redux/actions/SkenarioKuotaAction';

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

export default function SkenarioKuota() {
  const classes = useStyles();
  const skenarioKuotaState: SkenarioKuotaListState = useSelector((state: AppState) => state.skenarioKuota);
  const dispatch = useDispatch();
 
    useEffect(() => {
      dispatch(getSkenarioKuota(''));
      // eslint-disable-next-line
    }, []);

  return (
    <div className={classes.root}>
      <SkenarioKuotaToolbar />
      <div className={classes.content}>
        <SkenarioKuotaList skenario={skenarioKuotaState.data}/>
      </div>
    </div>
  );
}