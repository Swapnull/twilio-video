import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';

import { GlobalProvider } from '~contexts/Global';
import { base } from '@feast-it/pesto';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={base}>
        <Global
          styles={css`
            body: {
              margin: 0 !important;
              padding: 0 !important;
            }
          `}
        />
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
