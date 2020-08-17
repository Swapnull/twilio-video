import { useEffect, useState, useContext } from 'react';
import { RemoteParticipant } from 'twilio-video';
import { VideoContext } from '~contexts/Video';
import useDominantSpeaker from '~hooks/useDominantSpeaker';

const useParticipants = () => {
  const { room } = useContext(VideoContext);
  const dominantSpeaker = useDominantSpeaker();
  console.log('room', room);
  console.log('participants', room.participants);
  const [participants, setParticipants] = useState(
    Array.from(room?.participants?.values())
  );

  const participantConnected = (participant: RemoteParticipant) =>
    setParticipants((prevParticipants) => [...prevParticipants, participant]);

  const participantDisconnected = (participant: RemoteParticipant) =>
    setParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p !== participant)
    );

  useEffect(() => {
    // put dominantSpeaker at front of array
    if (dominantSpeaker) {
      setParticipants((prevParticipants) => [
        dominantSpeaker,
        ...prevParticipants.filter(
          (participant) => participant !== dominantSpeaker
        ),
      ]);
    }
  }, [dominantSpeaker]);

  useEffect(() => {
    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);

    return () => {
      room.off('participantConnected', participantConnected);
      room.off('participantDisconnected', participantDisconnected);
    };
  }, [room]);

  return participants;
};

export default useParticipants;
