import { useEffect, useState, useContext } from 'react';
import { VideoContext } from '~contexts/Video';
import { RemoteParticipant } from 'twilio-video';

const useDominantSpeaker = () => {
  const { room } = useContext(VideoContext);
  const [dominantSpeaker, setDominantSpeaker] = useState(room.dominantSpeaker);

  useEffect(() => {
    // Sometimes, the 'dominantSpeakerChanged' event can emit 'null', which means that
    // there is no dominant speaker. If we change the main participant when 'null' is
    // emitted, the effect can be jarring to the user. Here we ignore any 'null' values
    // and continue to display the previous dominant speaker as the main participant.
    const handleDominantSpeakerChanged = (
      newDominantSpeaker: RemoteParticipant
    ) => {
      if (newDominantSpeaker !== null) {
        setDominantSpeaker(newDominantSpeaker);
      }
    };

    // Since 'null' values are ignored, we will need to listen for the 'participantDisconnected'
    // event, so we can set the dominantSpeaker to 'null' when they disconnect.
    const handleParticipantDisconnected = (participant: RemoteParticipant) => {
      setDominantSpeaker((prevDominantSpeaker) => {
        return prevDominantSpeaker === participant ? null : prevDominantSpeaker;
      });
    };

    room.on('dominantSpeakerChanged', handleDominantSpeakerChanged);
    room.on('participantDisconnected', handleParticipantDisconnected);
    return () => {
      room.off('dominantSpeakerChanged', handleDominantSpeakerChanged);
      room.off('participantDisconnected', handleParticipantDisconnected);
    };
  }, [room]);

  return dominantSpeaker;
};

export default useDominantSpeaker;
