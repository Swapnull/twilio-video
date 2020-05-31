import React from 'react';
import {
  LocalAudioTrack,
  LocalVideoTrack,
  Participant,
  RemoteAudioTrack,
  RemoteVideoTrack,
} from 'twilio-video';

import AudioLevelIndicator from './AudioLevelIndicator';
import NetworkQualityLevel from './NetworkQualityLevel';
import ParticipantConnectionIndicator from './ParticipantConnectionIndicator';
import useParticipantNetworkQualityLevel from '~hooks/useParticipantNetworkQualityLevel';
import usePublications from '~hooks/usePublications';
import useTrack from '~hooks/useTrack';
import Style from './ParticipantInfo.style';

interface ParticipantInfoProps {
  participant: Participant;
  children: React.ReactNode;
  onClick: () => void;
}

const ParticipantInfo = ({
  participant,
  onClick,
  children,
}: ParticipantInfoProps) => {
  const publications = usePublications(participant);

  const audioPublication = publications.find(({ kind }) => kind === 'audio');
  const videoPublication = publications.find(({ trackName }) =>
    trackName.includes('camera')
  );

  const networkQualityLevel = useParticipantNetworkQualityLevel(participant);
  const isVideoEnabled = Boolean(videoPublication);

  const audioTrack = useTrack(audioPublication) as
    | LocalAudioTrack
    | RemoteAudioTrack;

  return (
    <Style.Container
      onClick={onClick}
      data-cy-participant={participant.identity}
    >
      <Style.InfoContainer>
        <Style.InfoRow>
          <Style.Identity>
            <ParticipantConnectionIndicator participant={participant} />
            {participant.identity}
          </Style.Identity>
          <NetworkQualityLevel qualityLevel={networkQualityLevel} />
        </Style.InfoRow>
        <div>
          <AudioLevelIndicator audioTrack={audioTrack} background="white" />
          {!isVideoEnabled && <div> Camera Off </div>}
        </div>
      </Style.InfoContainer>
      {/*isVideoSwitchedOff && <BandwidthWarning />*/}
      {children}
    </Style.Container>
  );
};

export default ParticipantInfo;
