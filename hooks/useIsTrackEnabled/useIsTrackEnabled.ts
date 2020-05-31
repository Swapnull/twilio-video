import { useState, useEffect } from 'react';
import {
  LocalAudioTrack,
  LocalVideoTrack,
  RemoteAudioTrack,
  RemoteVideoTrack,
} from 'twilio-video';

type TrackType =
  | LocalAudioTrack
  | LocalVideoTrack
  | RemoteAudioTrack
  | RemoteVideoTrack
  | undefined;

const useIsTrackEnabled = (track: TrackType) => {
  const [isEnabled, setIsEnabled] = useState(track ? track.isEnabled : true);

  const setEnabled = () => setIsEnabled(true);
  const setDisabled = () => setIsEnabled(false);

  useEffect(() => {
    setIsEnabled(track ? track.isEnabled : true);

    if (track) {
      track.on('enabled', setEnabled);
      track.on('disabled', setDisabled);

      return () => {
        track.off('enabled', setEnabled);
        track.off('disabled', setDisabled);
      };
    }
  }, [track]);

  return isEnabled;
};

export default useIsTrackEnabled;
