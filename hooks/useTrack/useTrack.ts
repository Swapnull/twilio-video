import { useEffect, useState } from 'react';
import { LocalTrackPublication, RemoteTrackPublication } from 'twilio-video';

const useTrack = (
  publication?: LocalTrackPublication | RemoteTrackPublication
) => {
  const [track, setTrack] = useState(publication && publication.track);

  //console.log('publication', publication);
  useEffect(() => {
    setTrack(publication && publication.track);

    if (publication) {
      const removeTrack = () => setTrack(null);

      publication.on('subscribed', setTrack);
      publication.on('unsubscribed', removeTrack);

      return () => {
        publication.off('subscribed', setTrack);
        publication.off('unsubscribed', removeTrack);
      };
    }
  }, [publication]);

  return track;
};

export default useTrack;
