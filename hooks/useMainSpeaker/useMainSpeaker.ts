import { useContext } from 'react';
import { VideoContext } from '~contexts/Video';
import useDominantSpeaker from '../useDominantSpeaker/useDominantSpeaker';
import useParticipants from '../useParticipants/useParticipants';

const useMainSpeaker = () => {
  const { room } = useContext(VideoContext);
  const dominantSpeaker = useDominantSpeaker();
  const participants = useParticipants();

  // Who is displayed in the main area
  return dominantSpeaker || participants[0] || room.localParticipant;
};

export default useMainSpeaker;
