import React, { useEffect, useState }  from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { LayoutState } from '../../interfaces/Layout';

const useStyles = makeStyles((theme:any) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60,
    marginTop: theme.spacing(1)
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

export function Profile(props) {
  const { className, ...rest } = props;
  const classes = useStyles();
  const layoutState: LayoutState = useSelector((state: AppState) => state.layout);

  const user = {
    name: 'John Doe',
    avatar: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
    bio: 'Developer'
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      { layoutState.indexPage ? <Skeleton animation="wave" variant="circle" width={60} height={60} /> :  <Avatar
        alt="Person"
        className={classes.avatar}
        src={user.avatar}
      /> }
      { layoutState.indexPage ? <Skeleton animation="wave" width={100} height={20} variant="text"/> : <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>}
      { layoutState.indexPage ? <Skeleton animation="wave" width={100} height={20} variant="text"/> : <Typography variant="body2">{user.bio}</Typography>}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
