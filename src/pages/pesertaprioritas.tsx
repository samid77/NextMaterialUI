import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { PesertaPrioritasList, PesertaPrioritasToolbar } from '../components/PesertaPrioritas';
import { AppState } from '../redux/reducers';
import { PesertaPrioritasListState } from '../interfaces/PesertaPrioritas';
import { getPesertaPrioritas } from '../redux/actions/PesertaPrioritasAction';

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

export default function PesertaPrioritas() {
  const classes = useStyles();
  const pesertaPrioritasState : PesertaPrioritasListState = useSelector((state: AppState) => state.pesertaPrioritas)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPesertaPrioritas(''));
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <PesertaPrioritasToolbar/>
      <div className={classes.content}>
        <PesertaPrioritasList pesertaPrioritas={pesertaPrioritasState.data}/>
      </div>
    </div>
  );
}