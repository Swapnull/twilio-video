import React, { ReactNode } from 'react';
import Style from './Info.style';
import { Participant } from 'twilio-video';
import usePublications from '~hooks/usePublications';

interface Props {
  participant: Participant;
  children: ReactNode;
}

const MainParticipantInfo = ({ participant, children }: Props) => {
  const publications = usePublications(participant);
  const videoPublication = publications.find(({ trackName }) =>
    trackName.includes('camera')
  );
  /* TODO: Implement `isVideoSwitchedOff` logic to blur camera if it is */

  return (
    <Style.Container>
      <Style.InfoContainer>
        <Style.Identity>
          {!Boolean(videoPublication) && <h1> No Video </h1>}
        </Style.Identity>
      </Style.InfoContainer>
      {/* TODO// Enable isVideoSwitchedOff && <BandwidthWarning />*/}
      {children}
    </Style.Container>
  );
};

export default MainParticipantInfo;
