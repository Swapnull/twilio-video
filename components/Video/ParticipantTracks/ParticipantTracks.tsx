import React, { useContext } from 'react';
import { Participant, Track } from 'twilio-video';
import Publication from './Publication';
import usePublications from '~hooks/usePublications';
import { VideoContext } from '~contexts/Video';

interface Props {
  participant: Participant;
  disableAudio?: boolean;
  videoPriority?: Track.Priority | null;
}

const ParticipantTracks = ({
  participant,
  disableAudio,
  videoPriority,
}: Props) => {
  const { room } = useContext(VideoContext);
  const publications = usePublications(participant);
  const isLocal = participant === room.localParticipant;

  return (
    <>
      {publications.map((publication) => (
        <Publication
          key={publication.kind}
          publication={publication}
          isLocal={isLocal}
          disableAudio={disableAudio}
          videoPriority={videoPriority}
        />
      ))}
    </>
  );
};

export default ParticipantTracks;
