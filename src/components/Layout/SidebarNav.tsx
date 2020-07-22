/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { LayoutState } from '../../interfaces/Layout';

const useStyles = makeStyles((theme:Theme) => ({
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
    letterSpacing: '-0.7px',
    width: '100%',
    fontWeight: 520
  },
  icon: {
    color: colors.blueGrey[600],
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: '-0.5px',
    width: '100%',
    fontWeight: 520,
    backgroundColor: '#C2E8CE',
  },
  nested: {
    paddingLeft: theme.spacing(3),
    paddingTop: 0,
    paddingBottom: 0,
  },
  expand: {
    paddingLeft: theme.spacing(1),
  },
}));

const CustomRouterLink = forwardRef((props: any, ref: any) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <Link {...props} />
  </div>
));

export function SidebarNav(props) {
  const { pages, className, ...rest } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const layoutState: LayoutState = useSelector((state: AppState) => state.layout);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <List {...rest} className={clsx(classes.root, className)}>
        {pages.map(page => (
          <Fragment key={page.title}>
            <ListItem
              className={classes.item}
              disableGutters
              key={page.title}
              onClick={handleClick}>
              <Link href={page.href}>
                <Button className={classes.button}>
                {layoutState.indexPage 
                  ? <Fragment>
                      <Skeleton animation="wave" variant="circle" width={40} height={40} /> <Skeleton animation="wave" style={{marginLeft: '1vw'}}variant="text" width={130} height={30}/>
                    </Fragment>
                  : <Fragment>
                      <div className={classes.icon}>{page.icon}</div>
                      {page.title}
                    </Fragment>}
                </Button>
              </Link>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
}

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
