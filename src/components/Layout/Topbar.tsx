import React, { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useMediaQuery } from '@material-ui/core';
import router from 'next/router';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { LayoutState } from '../../interfaces/Layout';
import Typography from '@material-ui/core/Typography';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme:any) => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '2em'
  },
  logoTitle: {
    marginLeft: theme.spacing(1),
    fontSize: '22px'
  }
}));

export function Topbar(props) {
  const { className, onSidebarOpen, component: Component, ...rest } = props;
  const classes = useStyles();
  const layoutState: LayoutState = useSelector((state: AppState) => state.layout);

  const handleSignOut = () => {
    localStorage.removeItem('accesstoken');
    router.push('/login');
  }


  return (
    <Fragment>
      <AppBar
        {...rest}
        className={clsx(classes.root, className)} 
        position="fixed"
      >
        <Toolbar>
          <Link href="/">
            {layoutState.indexPage ? <Skeleton animation="wave" variant="circle" width={40} height={40} /> : <img
              alt="Logo"
              src="/images/logos/tapera-logo.svg"
              height={75}
              width={75}
            />}
          </Link>
          {layoutState.indexPage 
            ? <Skeleton animation="wave" style={{marginLeft: '1vw'}}variant="text" width={130} height={30}/> 
            : <Typography variant="h4" className={classes.logoTitle}>BP TAPERA</Typography>
          }
          <div className={classes.flexGrow} />
          {Component.name !== 'Login' 
            ? <Fragment>
            <Hidden mdDown>
              <IconButton color="inherit">
                <Badge
                  badgeContent={5}
                  color="primary"
                  variant="dot"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Link href="/login">
                <IconButton
                  className={classes.signOutButton}
                  color="inherit"
                  onClick={handleSignOut}
                >
                  <InputIcon />
                </IconButton>
              </Link>
            </Hidden>
            <Hidden mdUp>
              <IconButton
                color="inherit"
                onClick={onSidebarOpen}
              >
                <MenuIcon />
              </IconButton>    
            </Hidden>
          </Fragment> : null }
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  component: PropTypes.any
};

export default Topbar;

