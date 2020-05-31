import { useEffect, useState } from 'react';
import { Participant } from 'twilio-video';

const useParticipantNetworkQualityLevel = (participant: Participant) => {
  const [networkQualityLevel, setNetworkQualityLevel] = useState(
    participant.networkQualityLevel
  );

  useEffect(() => {
    setNetworkQualityLevel(participant.networkQualityLevel);
    participant.on('networkQualityLevelChanged', setNetworkQualityLevel);

    return () => {
      participant.off('networkQualityLevelChanged', setNetworkQualityLevel);
    };
  }, [participant]);

  return networkQualityLevel;
};

export default useParticipantNetworkQualityLevel;
