import React, { useEffect } from 'react';
import router from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch } from 'react-redux';
import { isIndexPage } from '../redux/actions/LayoutActions';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    root: {
      backgroundColor: '#F4F6F8',
      height: '100%',
      maxWidth: '100%'
    },
    grid: {
      height: '100%',
      marginTop: theme.spacing(15)
    },
    background: {
      display: 'flex',
      backgroundImage: 'url(/images/houses.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    loadingText: {
      marginTop: theme.spacing(2)
    },
    loading: {
      marginTop: theme.spacing(2)
    }
  })
)

export default function Search() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(isIndexPage(true));
    setTimeout(() => {
      router.push('/dashboard');
    }, 5000);
  }, [])

  return(
    <div className={classes.root}>
      <Grid className={classes.grid} container justify="center">
        <Grid item>
          <img src={'/images/background_001.svg'} />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <LinearProgress className={classes.loading}/>
          <Typography
                className={classes.loadingText}
                variant="h2"
            >
              Loading the system...
            </Typography>
        </Grid>
      </Grid>
    </div>
  )
}