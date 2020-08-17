import React, { useState, useEffect } from 'react';
import { Participant } from 'twilio-video';
import Style from './ParticipantConnectionIndicator.style';

interface Props {
  participant: Participant;
}

const ParticipantConnectionIndicator = ({ participant }: Props) => {
  const [isReconnecting, setIsReconnecting] = useState(false);
  const handleReconnecting = () => setIsReconnecting(true);
  const handleReconnected = () => setIsReconnecting(false);

  useEffect(() => {
    participant.on('reconnecting', handleReconnecting);
    participant.on('reconnected', handleReconnected);
    return () => {
      participant.off('reconnecting', handleReconnecting);
      participant.off('reconnected', handleReconnected);
    };
  }, [participant]);

  return <Style.Indicator isReconnecting={isReconnecting} />;
};

export default ParticipantConnectionIndicator;
