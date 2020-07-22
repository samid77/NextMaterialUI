import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import RefreshIcon from '@material-ui/icons/Refresh';
import { colors } from '@material-ui/core';
import {ParameterEligible, ParameterEligibleState} from '../../interfaces/ParameterEligible';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';

const useStyles = makeStyles((theme:Theme) => ({
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
  const classes = useStyles();
  const parameterEligibleState: ParameterEligibleState = useSelector((state: AppState) => state.parameterEligible);
  const isEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const data = {
    datasets: [
      {
        data: isEmpty(props.parameligible) ? [0, 0] : [props.parameligible.eligible, props.parameligible.ineligible],
        backgroundColor: [
          '#00B45A',
          '#326144',
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

  const chartParamEligible = [
    {
      title: 'Eligible',
      value: isEmpty(props.parameligible) ? 0 : props.parameligible.eligible,
      icon: <CheckCircleRoundedIcon />,
      color: '#00B45A'
    },
    {
      title: 'Tidak Eligible',
      value: isEmpty(props.parameligible) ? 0 : props.parameligible.ineligible,
      icon: <CancelRoundedIcon />,
      color: '#326144'
    },
  ];

  return (
    <Card>
      <CardHeader title="Chart Eligible"/>
      <Divider />
      <CardContent>
        {
          isEmpty(props.parameligible) || parameterEligibleState.response === 404 || parameterEligibleState.response === 500 || parameterEligibleState.response === 400
          ? <div className={classes.stats}>
              <img src={'/images/nodata.jpg'} height="400" width="400"/>
            </div>
          : <div>
              <div className={classes.chartContainer}>
                <Pie data={data} options={options}/>
              </div>
              <div className={classes.stats}>
                {chartParamEligible.map(device => (
                  <div className={classes.device} key={device.title}>
                    <span className={classes.deviceIcon}>{device.icon}</span>
                    <Typography variant="body1">{device.title}</Typography>
                    <Typography style={{ color: device.color }} variant="h2">
                      {device.value}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
        }
      </CardContent>
    </Card>
  );
}

export default ChartEligible;