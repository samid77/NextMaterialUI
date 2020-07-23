import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export default function AlokasiKIDT() {
    const classes = useStyles();
    const dispatch = useDispatch();
 
    // useEffect(() => {
    //   dispatch(getMitraData(''));
    //   // eslint-disable-next-line
    // }, []);

    return (
        <div className={classes.root}>
            Alokasi KIDT Page
          {/* <MitraToolbar />
          <div className={classes.content}>
            <MitraList mitra={mitraDataState.data} />
          </div> */}
        </div>
    );
}