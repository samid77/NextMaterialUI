import React, {useEffect} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { EligibleList, ChartEligible } from '../components/Eligible';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { ParameterEligibleState } from '../interfaces/ParameterEligible';
import { getParameterEligible } from '../redux/actions/ParameterEligibleAction';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

export default function Eligible() {
    const classes = useStyles();
    const parameterEligibleState: ParameterEligibleState = useSelector((state: AppState) => state.parameterEligible);
    const dispatch = useDispatch();
 
    useEffect(() => {
      dispatch(getParameterEligible(''));
      // eslint-disable-next-line
    }, []);

    return(
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EligibleList />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <ChartEligible parameligible={parameterEligibleState.data}/>
            </Grid>
          </Grid>
        </div>
    )
}