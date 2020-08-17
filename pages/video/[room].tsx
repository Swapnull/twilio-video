import React from 'react';
import { VideoProvider } from '~contexts/Video';
import Video from '~components/Video';
import { ConnectOptions } from 'twilio-video';
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

const VideoRoomPage = ({ room }: { room: string }) => (
  <VideoProvider
    options={connectionOptions}
    onError={(error) => console.error(`Video Provider Error: ${error}`)}
    onDisconnect={() => console.warn('Video Provider Disconnected')}
  >
    <Video room={room} />
  </VideoProvider>
);

VideoRoomPage.getInitialProps = ({ query }) => ({ room: query.room });

export default VideoRoomPage;
