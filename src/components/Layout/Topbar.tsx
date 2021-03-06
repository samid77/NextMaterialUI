import React, { Fragment } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import router from 'next/router';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { LayoutState } from '../../interfaces/Layout';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(0.5),
  },
  iconClass: {
    color: '#4caf50',
    fontSize: '2rem'
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '2em'
  },
  logoTitle: {
    marginLeft: theme.spacing(2),
    fontSize: '22px',
    color: '#326144',
    fontWeight: 600
  },
  logoImage: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0)
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
            {layoutState.indexPage 
              ? <Skeleton animation="wave" variant="circle" width={40} height={40} /> 
              : <img
                  alt="Logo"
                  src="/images/logos/tapera.png"
                  className={classes.logoImage}
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
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon className={classes.iconClass}/>
                </Badge>
              </IconButton>
              <Link href="/login">
                <IconButton
                  className={classes.signOutButton}
                  color="inherit"
                  onClick={handleSignOut}>
                  <InputIcon className={classes.iconClass} />
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
}

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  component: PropTypes.any
};

export default Topbar;

