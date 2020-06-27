import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { MitraToolbar, MitraList } from '../components/Mitra';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { MitraDataListState } from '../interfaces/MitraData';
import { getMitraData } from '../redux/actions/MitraDataAction';

const useStyles = makeStyles((theme:Theme) => ({
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
      dispatch(getMitraData(''));
      // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
          <MitraToolbar />
          <div className={classes.content}>
            <MitraList mitra={mitraDataState.data} />
          </div>
        </div>
    );
}