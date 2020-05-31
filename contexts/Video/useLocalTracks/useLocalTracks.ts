import { useCallback, useEffect, useState } from 'react';

import ensureMediaPermissions from '~utils/ensureMediaPermissions';
import Video, {
  LocalVideoTrack,
  LocalAudioTrack,
  CreateLocalTrackOptions,
} from 'twilio-video';

export function useLocalAudioTrack() {
  const [track, setTrack] = useState<LocalAudioTrack>();

  const getLocalAudioTrack = useCallback((deviceId?: string) => {
    const options: CreateLocalTrackOptions = {};

    if (deviceId) {
      options.deviceId = { exact: deviceId };
    }

    return ensureMediaPermissions().then(() =>
      Video.createLocalAudioTrack(options).then((newTrack) => {
        setTrack(newTrack);
        return newTrack;
      })
    );
  }, []);

  useEffect(() => {
    getLocalAudioTrack();
  }, [getLocalAudioTrack]);

  useEffect(() => {
    const handleStopped = () => setTrack(undefined);
    if (track) {
      track.on('stopped', handleStopped);
      return () => {
        track.off('stopped', handleStopped);
      };
    }
  }, [track]);

  return [track, getLocalAudioTrack] as const;
}

export const useLocalVideoTrack = () => {
  const [track, setTrack] = useState<LocalVideoTrack>();

  const getLocalVideoTrack = useCallback(
    (newOptions?: CreateLocalTrackOptions) => {
      const options: CreateLocalTrackOptions = {
        frameRate: 24,
        height: 720,
        width: 1280,
        name: `camera-${Date.now()}`,
        ...newOptions,
      };

      return ensureMediaPermissions().then(() =>
        Video.createLocalVideoTrack(options).then((newTrack) => {
          setTrack(newTrack);
          return newTrack;
        })
      );
    },
    []
  );

  useEffect(() => {
    getLocalVideoTrack();
  }, [getLocalVideoTrack]);

  useEffect(() => {
    const handleStopped = () => setTrack(undefined);
    if (track) {
      track.on('stopped', handleStopped);
      return () => {
        track.off('stopped', handleStopped);
      };
    }
  }, [track]);

  return [track, getLocalVideoTrack] as const;
};

const useLocalTracks = () => {
  const [audioTrack, getLocalAudioTrack] = useLocalAudioTrack();
  const [videoTrack, getLocalVideoTrack] = useLocalVideoTrack();

  const localTracks = [audioTrack, videoTrack].filter(
    (track) => track !== undefined
  ) as (LocalAudioTrack | LocalVideoTrack)[];

  return { localTracks, getLocalVideoTrack, getLocalAudioTrack };
};

export default useLocalTracks;
