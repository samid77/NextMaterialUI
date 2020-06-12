/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemIcon, ListItemText, Button, colors } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  nested: {
    paddingLeft: theme.spacing(3),
    paddingTop: 0,
    paddingBottom: 0,
  },
  expand: {
    paddingLeft: theme.spacing(1),
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <Link {...props} />
  </div>
));

export function SidebarNav(props) {
  const { pages, className, ...rest } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <List
        {...rest}
        className={clsx(classes.root, className)}
      >
        {pages.map(page => (
          <Fragment key={page.title}>
            {page.nested 
                ? <ListItem
                    className={classes.item}
                    disableGutters
                    key={page.title}
                    onClick={handleClick}
                  >
                    <Link href={page.href}>
                      <Button
                        activeClassName={classes.active}
                        className={classes.button}
                      >
                        <div className={classes.icon}>{page.icon}</div>
                        {page.title}
                        {open ? <ExpandLess className={classes.expand}/> : <ExpandMore className={classes.expand}/>}
                      </Button>
                    </Link>
                  </ListItem>
                : <ListItem
                    className={classes.item}
                    disableGutters
                    key={page.title}
                  >
                    <Link href={page.href}>
                      <Button
                        activeClassName={classes.active}
                        className={classes.button}
                      >
                        <div className={classes.icon}>{page.icon}</div>
                        {page.title}
                      </Button>
                    </Link>
                  </ListItem>
                }
          </Fragment>
        ))}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListItem
              className={classes.nested}
              disableGutters
            >
              <Link href='/'>
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                >
                  <div className={classes.icon}>
                    <AccountBalanceRoundedIcon />
                  </div>
                  Master Data Mitra
                </Button>
              </Link>
            </ListItem>
            <ListItem
              className={classes.nested}
              disableGutters
            >
              <Link href='/'>
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                >
                  <div className={classes.icon}>
                    <StarsRoundedIcon />
                  </div>
                  Master Data Produk
                </Button>
              </Link>
            </ListItem>
        </Collapse>
      </List>
    </Fragment>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
