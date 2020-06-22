import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import mockData from '../components/usersdata';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export default function Peserta() {
    const classes = useStyles();
    const [users] = useState(mockData);

    return(
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography variant="h3">Peserta Route</Typography>
            </div>
        </div>
    )
}