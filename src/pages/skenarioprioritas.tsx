import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { SkenarioPrioritasToolbar, SkenarioPrioritasList } from '../components/SkenarioPrioritas';
import { SkenarioPrioritasListState } from '../interfaces/SkenarioPrioritas';
import { AppState } from '../redux/reducers';
import { getSkenarioPrioritas } from '../redux/actions/SkenarioPrioritasAction';

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

export default function SkenarioPrioritas() {
  const classes = useStyles();
  const skenarioPrioritasState: SkenarioPrioritasListState = useSelector((state: AppState) => state.skenarioPrioritas);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getSkenarioPrioritas(''));
      // eslint-disable-next-line
    }, []);

  return (
    <div className={classes.root}>
      <SkenarioPrioritasToolbar />
      <div className={classes.content}>
        <SkenarioPrioritasList prioritas={skenarioPrioritasState.data}/>
      </div>
    </div>
  );
}