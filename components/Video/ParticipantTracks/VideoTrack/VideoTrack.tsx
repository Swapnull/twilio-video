import React, { useRef, useEffect } from 'react';
import { Track } from 'twilio-video';
import { IVideoTrack } from '~types/twilio';
import Style from './VideoTrack.style';

interface VideoTrackProps {
  track: IVideoTrack;
  isLocal?: boolean;
  priority?: Track.Priority | null;
}

const VideoTrack = ({ track, isLocal, priority }: VideoTrackProps) => {
  const videoRef = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    const video = videoRef.current;
    video.muted = true;

    if (track.setPriority && priority) track.setPriority(priority);
    track.attach(video);

    return () => {
      track.detach(video);
      if (track.setPriority && priority) track.setPriority(null);
    };
  }, [track, priority]);

  // The local video track is mirrored.
  const isFrontFacing =
    track.mediaStreamTrack.getSettings().facingMode !== 'environment';
  const style =
    isLocal && isFrontFacing ? { transform: 'rotateY(180deg)' } : {};

  return <Style.Video ref={videoRef} style={style} />;
};

export default VideoTrack;
