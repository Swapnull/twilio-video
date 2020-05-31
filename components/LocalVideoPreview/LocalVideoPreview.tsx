import React, { useContext } from 'react';
import { LocalVideoTrack } from 'twilio-video';
import VideoTrack from '~components/ParticipantTracks/VideoTrack';
import { VideoContext } from '~contexts/Video';

const LocalVideoPreview = () => {
  const { localTracks } = useContext(VideoContext);

  const videoTrack = localTracks.find((track) =>
    track.name.includes('camera')
  ) as LocalVideoTrack;

  return videoTrack ? <VideoTrack track={videoTrack} isLocal /> : null;
};

export default LocalVideoPreview;
