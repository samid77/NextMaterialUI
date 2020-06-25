import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import RefreshIcon from '@material-ui/icons/Refresh';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme:any) => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: colors.blueGrey[600]
  }
}));

export function ChartEligible(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  const data = {
    datasets: [
      {
        data: [1000, 3000],
        backgroundColor: [
          colors.green[500],
          colors.red[600],
        ],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Eligible', 'Tidak Eligible']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 40,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: colors.grey[200],
      backgroundColor: '#FFFFFF',
      titleFontColor: colors.blueGrey[900],
      bodyFontColor: colors.blueGrey[600],
      footerFontColor: colors.blueGrey[600]
    }
  };

  const devices = [
    {
      title: 'Eligible',
      value: '1000',
      icon: <CheckCircleRoundedIcon />,
      color: colors.green[500]
    },
    {
      title: 'Tidak Eligible',
      value: '3000',
      icon: <CancelRoundedIcon />,
      color: colors.red[600]
    },
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Chart Eligible"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Pie
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h2"
              >
                {device.value}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

ChartEligible.propTypes = {
  className: PropTypes.string
};

export default ChartEligible;