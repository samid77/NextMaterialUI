import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { PesertaEligibleList, PesertaEligibleToolbar } from '../components/PesertaEligible';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { PesertaEligibleListState } from '../interfaces/PesertaEligible';
import { getPesertaEligible } from '../redux/actions/PesertaEligibleAction';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2)
  },
}));

export default function PesertaPrioritas() {
  const classes = useStyles();
  const pesertaEligibleState : PesertaEligibleListState = useSelector((state: AppState) => state.pesertaEligible)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPesertaEligible(''));
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className={classes.root}>
      <PesertaEligibleToolbar/>
      <div className={classes.content}>
        <PesertaEligibleList pesertaEligible={pesertaEligibleState.data}/>
      </div>
    </div>
  );
}