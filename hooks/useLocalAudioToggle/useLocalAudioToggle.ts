import { LocalAudioTrack } from 'twilio-video';
import { useCallback, useContext } from 'react';
import useIsTrackEnabled from '../useIsTrackEnabled/useIsTrackEnabled';
import { VideoContext } from '~contexts/Video';

const useLocalAudioToggle = () => {
  const { localTracks } = useContext(VideoContext);
  const track = localTracks.find(
    (track) => track.kind === 'audio'
  ) as LocalAudioTrack;
  const isEnabled = useIsTrackEnabled(track);
  const toggleAudioEnabled = useCallback(() => {
    if (track) {
      track.isEnabled ? track.disable() : track.enable();
    }
  }, [track]);

  return [isEnabled, toggleAudioEnabled] as const;
};

export default useLocalAudioToggle;
