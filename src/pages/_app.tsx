import React, { Fragment, useState, useEffect }from 'react';
import { wrapper } from '../store'

import { Box, Container, CssBaseline, useMediaQuery, colors } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/styles';

import axios from 'axios';
import { SWRConfig } from 'swr';
import clsx from 'clsx';

import App from 'next/app';
import Head from 'next/head';

import { Topbar } from '../components/Topbar';
import { Sidebar } from '../components/Sidebar';
import {Layout} from '../components/Layout';
import palette from '../theme/palette';
import typography from '../theme/typography';
import overrides from '../theme/overrides';


// Create a theme instance.
export const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    ['(min-width:600px)']: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

function MyApp({ Component, pageProps }) {

  const [openSidebar, setOpenSidebar] = useState(false);


  const isDesktop = useMediaQuery('(min-width:1280px)', {
    defaultMatches: true
  });

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const classes = useStyles();

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <Fragment>
      <Head>
        <title>BP TAPERA | PMF</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          {Component.name !== 'Login' 
          ? <div className={clsx({
              [classes.root]: true,
              [classes.shiftContent]: isDesktop
            })}>
              <Topbar 
                onSidebarOpen={handleSidebarOpen}
                component={Component}
              />
              {Component.name !== 'Login' ? <Sidebar
                  onClose={handleSidebarClose}
                  open={shouldOpenSidebar}
                  variant={isDesktop ? 'persistent' : 'temporary'}
              />: null}
              <Container maxWidth={false}>
                <Box marginTop={2}>
                  <Component {...pageProps} />
                </Box>
              </Container>
            </div> 
          : <div className={classes.root}>
              <Topbar 
                component={Component}
              />
              <main className={classes.content}>
                <Container maxWidth={false}>
                  <Box marginTop={2}>
                    <Component {...pageProps} />
                  </Box>
                </Container>
              </main>
            </div>}
      </ThemeProvider>
    </Fragment>
  );
}

// export default MyApp
export default wrapper.withRedux(MyApp)

