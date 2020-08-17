import React from 'react';
import ParticipantInfo from '~components/Video/ParticipantStrip/ParticipantInfo';
import ParticipantTracks from '~components/Video/ParticipantTracks';
import { Participant as IParticipant } from 'twilio-video';

interface ParticipantProps {
  participant: IParticipant;
  disableAudio?: boolean;
  onClick: () => void;
}

const Participant = ({
  participant,
  disableAudio,
  onClick,
}: ParticipantProps) => (
  <ParticipantInfo participant={participant} onClick={onClick}>
    <ParticipantTracks participant={participant} disableAudio={disableAudio} />
  </ParticipantInfo>
);

export default Participant;
