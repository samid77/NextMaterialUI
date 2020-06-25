import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import Brightness5RoundedIcon from '@material-ui/icons/Brightness5Rounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import { Profile } from './Profile';
import { SidebarNav } from './SidebarNav';
import { colors } from '@material-ui/core';


const useStyles = makeStyles((theme:any) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

export function Sidebar(props) {
  const { open, variant, onClose, className, ...rest } = props;
  const classes = useStyles();


  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardRoundedIcon />
    },
    {
      title: 'Daftar Eligible',
      href: '/eligible',
      icon: <PlaylistAddCheckRoundedIcon />
    },
    {
      title: 'Master Data Mitra',
      href: '/mitra',
      icon: <AccountBalanceRoundedIcon />
    },
    {
      title: 'Master Data Produk',
      href: '/produk',
      icon: <StarsRoundedIcon />
    },
    
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
