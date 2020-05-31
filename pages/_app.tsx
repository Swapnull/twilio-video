import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';

import { GlobalProvider } from '~contexts/Global';
import { VideoProvider } from '~contexts/Video';
import { ConnectOptions } from 'twilio-video';
import { base } from '@feast-it/pesto';
import isMobile from '~utils/isMobile';

const connectionOptions: ConnectOptions = {
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      dominantSpeakerPriority: 'standard',
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 90, width: 160 },
      },
    },
  },
  dominantSpeaker: true,
  networkQuality: { local: 1, remote: 1 },
  maxAudioBitrate: 16000,
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
};

// For mobile browsers, limit the maximum incoming video bitrate to 2.5 Mbps.
if (isMobile && connectionOptions?.bandwidthProfile?.video) {
  connectionOptions!.bandwidthProfile!.video!.maxSubscriptionBitrate = 2500000;
}

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
          <VideoProvider
            options={connectionOptions}
            onError={(error) => console.error(`Video Provider Error: ${error}`)}
            onDisconnect={() => console.warn('Video Provider Disconnected')}
          >
            <Component {...pageProps} />
          </VideoProvider>
        </GlobalProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
