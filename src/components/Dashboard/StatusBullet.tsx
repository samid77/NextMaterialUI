import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display: 'inline-block',
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0
  },
  sm: {
    height: theme.spacing(1),
    width: theme.spacing(1)
  },
  md: {
    height: theme.spacing(2),
    width: theme.spacing(2)
  },
  lg: {
    height: theme.spacing(3),
    width: theme.spacing(3)
  },
  neutral: {
    backgroundColor: '#FFFFFF'
  },
  primary: {
    backgroundColor: colors.green[500]
  },
  info: {
    backgroundColor: colors.blue[600]
  },
  warning: {
    backgroundColor: colors.orange[600]
  },
  danger: {
    backgroundColor: colors.red[600]
  },
  success: {
    backgroundColor: colors.green[600]
  }
}));

export function StatusBullet(props) {
  const { className, size, color, ...rest } = props;

  const classes = useStyles();

  return (
    <span
      {...rest}
      className={clsx(
        {
          [classes.root]: true,
          [classes[size]]: size,
          [classes[color]]: color
        },
        className
      )}
    />
  );
}

StatusBullet.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

StatusBullet.defaultProps = {
  size: 'md',
  color: 'default'
};


export default StatusBullet
