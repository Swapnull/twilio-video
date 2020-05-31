import React, { useCallback, useEffect, useState, useContext } from 'react';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import { Button } from '@feast-it/pesto';
import { VideoContext } from '~contexts/Video';

const FlipCameraButton = () => {
  const {
    room: { localParticipant },
    localTracks,
    getLocalVideoTrack,
  } = useContext(VideoContext);
  const [supportsFacingMode, setSupportsFacingMode] = useState<Boolean | null>(
    null
  );
  const videoTrack = localTracks.find((track) => track.name.includes('camera'));
  const facingMode = videoTrack?.mediaStreamTrack.getSettings().facingMode;

  useEffect(() => {
    if (facingMode && supportsFacingMode === null) {
      setSupportsFacingMode(Boolean(facingMode));
    }
  }, [facingMode, supportsFacingMode]);

  const toggleFacingMode = useCallback(async () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';

    videoTrack!.stop();

    const newVideoTrack = await getLocalVideoTrack({
      facingMode: newFacingMode,
    });

    const localTrackPublication = localParticipant?.unpublishTrack(videoTrack!);
    localParticipant?.emit('trackUnpublished', localTrackPublication);

    localParticipant?.publishTrack(newVideoTrack, { priority: 'low' });
  }, [facingMode, getLocalVideoTrack, localParticipant, videoTrack]);

  return supportsFacingMode ? (
    <Button onClick={toggleFacingMode} disabled={!videoTrack}>
      <FlipCameraIosIcon />
    </Button>
  ) : null;
};

export default FlipCameraButton;
