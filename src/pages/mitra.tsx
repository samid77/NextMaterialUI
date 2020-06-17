import React, { Fragment, useStyle, useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { MitraToolbar } from '../components/MitraToolbar';
import { MitraList } from '../components/MitraList';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { MitraDataListState } from '../interfaces/MitraData';
import { getMitraData } from '../redux/actions/MitraDataAction';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export default function Mitra() {
    const classes = useStyles();
    const mitraDataState: MitraDataListState = useSelector((state: AppState) => state.mitraData);
    const dispatch = useDispatch();
 
    useEffect(() => {
      console.log(mitraDataState);
      dispatch(getMitraData(''));
    }, []);

    return (
        <div className={classes.root}>
          <MitraToolbar />
          <div className={classes.content}>
            <MitraList mitra={mitraDataState.response} />
          </div>
        </div>
    );
}