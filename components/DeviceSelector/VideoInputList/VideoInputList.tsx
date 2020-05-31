import React, { useContext } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { LocalVideoTrack } from 'twilio-video';
import { useVideoInputDevices } from '~hooks/useDevices';
import VideoTrack from '~components/ParticipantTracks/VideoTrack';
import { VideoContext } from '~contexts/Video';
import Style from './VideoInputList.style';
import { Heading, Text } from '@feast-it/pesto';

const VideoInputList = () => {
  const videoInputDevices = useVideoInputDevices();
  const {
    room: { localParticipant },
    localTracks,
    getLocalVideoTrack,
  } = useContext(VideoContext);

  const localVideoTrack = localTracks.find(
    ({ kind }) => kind === 'video'
  ) as LocalVideoTrack;
  const localVideoInputDeviceId = localVideoTrack?.mediaStreamTrack.getSettings()
    .deviceId;

  const replaceTrack = async (newDeviceId: string) => {
    localVideoTrack?.stop();
    const newTrack = await getLocalVideoTrack({
      deviceId: { exact: newDeviceId },
    });

    if (localVideoTrack) {
      const localTrackPublication = localParticipant?.unpublishTrack(
        localVideoTrack
      );
      localParticipant?.emit('trackUnpublished', localTrackPublication);
    }

    localParticipant?.publishTrack(newTrack);
  };

  return (
    <div>
      {videoInputDevices.length > 1 ? (
        <FormControl>
          <Heading variant="headingMedium">Video Input:</Heading>
          <Select
            onChange={(e) => replaceTrack(e.target.value as string)}
            value={localVideoInputDeviceId || ''}
          >
            {videoInputDevices.map((device) => (
              <MenuItem value={device.deviceId} key={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <>
          <Heading variant="headingMedium">Video Input:</Heading>
          <Text>
            {localVideoTrack?.mediaStreamTrack.label || 'No Local Video'}
          </Text>
        </>
      )}
      {localVideoTrack && (
        <Style.Preview>
          <VideoTrack isLocal track={localVideoTrack} />
        </Style.Preview>
      )}
    </div>
  );
};

export default VideoInputList;
