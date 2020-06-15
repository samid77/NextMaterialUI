import React, { Fragment, useStyle, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { MitraToolbar } from '../components/MitraToolbar';
import { MitraList } from '../components/MitraList';
import mockData from '../components/mitradata';

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
    const [mitra] = useState(mockData);

    return (
        <div className={classes.root}>
        <MitraToolbar />
            <div className={classes.content}>
                <MitraList mitra={mitra} />
            </div>
        </div>
    );
}