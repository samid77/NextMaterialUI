import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import HouseRoundedIcon from '@material-ui/icons/HouseRounded';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    height: '100%',
    backgroundColor: colors.green[500],
    color: '#FFFFFF'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: '#FFFFFF',
    color: colors.green[500],
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

export function TotalProfit(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              JUMLAH REALISASI (SAMPLE)
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              3500 UNIT 
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <HouseRoundedIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;

