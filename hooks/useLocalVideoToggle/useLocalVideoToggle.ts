import { useCallback, useContext } from 'react';
import { LocalVideoTrack } from 'twilio-video';
import { VideoContext } from '~contexts/Video';

const useLocalVideoToggle = () => {
  const {
    room: { localParticipant },
    localTracks,
    getLocalVideoTrack,
  } = useContext(VideoContext);
  const videoTrack = localTracks.find(({ name }) =>
    name.includes('camera')
  ) as LocalVideoTrack;

  const toggleVideoEnabled = useCallback(async () => {
    if (videoTrack) {
      if (localParticipant) {
        const localTrackPublication = localParticipant.unpublishTrack(
          videoTrack
        );
        localParticipant.emit('trackUnpublished', localTrackPublication);
      }
      videoTrack.stop();
    } else {
      const track = await getLocalVideoTrack();
      if (localParticipant)
        localParticipant.publishTrack(track, { priority: 'low' });
    }
  }, [videoTrack, localParticipant, getLocalVideoTrack]);

  return [!!videoTrack, toggleVideoEnabled] as const;
};

export default useLocalVideoToggle;
