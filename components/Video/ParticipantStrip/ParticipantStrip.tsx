import React, { useContext } from 'react';
import Participant from './Participant';
import useParticipants from '~hooks/useParticipants';
import Style from './ParticipantStrip.style';
import { VideoContext } from '~contexts/Video';
import { SelectedParticipantContext } from '~contexts/SelectedParticipant';

const ParticipantStrip = () => {
  const {
    room: { localParticipant },
  } = useContext(VideoContext);
  const [_, setSelectedParticipant] = useContext(SelectedParticipantContext);
  const participants = useParticipants();

  return (
    <Style.Container>
      <Style.ScrollContainer>
        <Participant
          participant={localParticipant}
          onClick={() => setSelectedParticipant(localParticipant)}
        />
        {participants.map((participant) => (
          <Participant
            key={participant.sid}
            participant={participant}
            onClick={() => setSelectedParticipant(participant)}
          />
        ))}
      </Style.ScrollContainer>
    </Style.Container>
  );
};

export default ParticipantStrip;
