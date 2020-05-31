import React from 'react';
import useTrack from '~hooks/useTrack';
import AudioTrack from '../AudioTrack';
import VideoTrack from '../VideoTrack';

import { IVideoTrack } from '~types/twilio';
import {
  AudioTrack as IAudioTrack,
  LocalTrackPublication,
  RemoteTrackPublication,
  Track,
} from 'twilio-video';

interface Props {
  publication: LocalTrackPublication | RemoteTrackPublication;
  isLocal: boolean;
  disableAudio?: boolean;
  videoPriority?: Track.Priority | null;
}

const Publication = ({
  publication,
  isLocal,
  disableAudio,
  videoPriority,
}: Props) => {
  const track = useTrack(publication);

  if (!track) return null;

  switch (track.kind) {
    case 'video':
      return (
        <VideoTrack
          track={track as IVideoTrack}
          priority={videoPriority}
          isLocal={track.name.includes('camera') && isLocal}
        />
      );
    case 'audio':
      console.log('disableAudio', disableAudio);
      return disableAudio ? null : <AudioTrack track={track as IAudioTrack} />;
    default:
      return null;
  }
};

export default Publication;
