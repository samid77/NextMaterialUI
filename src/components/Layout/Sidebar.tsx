import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import NextWeekRoundedIcon from '@material-ui/icons/NextWeekRounded';
import NewReleasesRoundedIcon from '@material-ui/icons/NewReleasesRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import DonutSmallRoundedIcon from '@material-ui/icons/DonutSmallRounded';
import { Profile } from './Profile';
import { SidebarNav } from './SidebarNav';


const useStyles = makeStyles((theme:Theme) => ({
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
      title: 'Parameter Eligible',
      href: '/eligible',
      icon: <DonutSmallRoundedIcon />
    },
    // {
    //   title: 'List Eligible',
    //   href: '/listeligible',
    //   icon: <BeenhereRoundedIcon />
    // },
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
    {
      title: 'Skenario Kuota',
      href: '/skenariokuota',
      icon: <NextWeekRoundedIcon />
    },
    {
      title: 'Skenario Prioritas',
      href: '/skenarioprioritas',
      icon: <NewReleasesRoundedIcon />
    },
    {
      title: 'Peserta Eligible',
      href: '/pesertaeligible',
      icon: <AssignmentIndRoundedIcon />
    },
    {
      title: 'Peserta Prioritas',
      href: '/pesertaprioritas',
      icon: <AssignmentIndRoundedIcon />
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
}

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
