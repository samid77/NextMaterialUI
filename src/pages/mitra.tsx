import React, { Fragment, useStyle, useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { MitraToolbar } from '../components/MitraToolbar';
import { MitraList } from '../components/MitraList';

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
    const [data, setData] = useState([]);

    const getMitraData = async () => {
      const result = await axios(
        'http://localhost:3001/datamitra',
      );
      setData(result.data);
    }
 
    useEffect(() => {
      getMitraData();
      // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
          <MitraToolbar />
          <div className={classes.content}>
            <MitraList mitra={data} />
          </div>
        </div>
    );
}