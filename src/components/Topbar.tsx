import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
}));

export function Topbar(props) {
  const { className, onSidebarOpen, component: Component, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const handleSignOut = () => {
    localStorage.removeItem('accesstoken');
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
            <img
              alt="Logo"
              src="/images/logos/tapera-logo.svg"
              height={75}
              width={75}
            />
          </Link>
          <div className={classes.flexGrow} />
          {Component.name !== 'Login' ? <Fragment><Hidden mdDown>
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
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton></Fragment> : null }
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

