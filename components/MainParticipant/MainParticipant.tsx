import React, { useContext } from 'react';
import Info from './Info';
import ParticipantTracks from '~components/ParticipantTracks';
import useMainSpeaker from '~hooks/useMainSpeaker';
import { SelectedParticipantContext } from '~contexts/SelectedParticipant';

const MainParticipant = () => {
  const mainParticipant = useMainSpeaker();
  const [selectedParticipant] = useContext(SelectedParticipantContext);

  const videoPriority = mainParticipant === selectedParticipant ? 'high' : null;
  return (
    <Info participant={mainParticipant}>
      <ParticipantTracks
        participant={mainParticipant}
        disableAudio
        videoPriority={videoPriority}
      />
    </Info>
  );
};

export default MainParticipant;
