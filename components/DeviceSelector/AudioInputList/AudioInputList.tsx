import React, { useContext } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { Heading, Text } from '@feast-it/pesto';
import AudioLevelIndicator from '~components/ParticipantStrip/ParticipantInfo/AudioLevelIndicator';
import { useAudioInputDevices } from '~hooks/useDevices';
import { VideoContext } from '~contexts/Video';
import Style from './AudioInputList.style';
import { LocalAudioTrack } from 'twilio-video';

const AudioInputList = () => {
  const audioInputDevices = useAudioInputDevices();
  const {
    room: { localParticipant },
    localTracks,
    getLocalAudioTrack,
  } = useContext(VideoContext);

  const localAudioTrack = localTracks.find(
    ({ kind }) => kind === 'audio'
  ) as LocalAudioTrack;

  const localAudioInputDeviceId = localAudioTrack?.mediaStreamTrack.getSettings()
    .deviceId;

  const replaceTrack = async (newDeviceId: string) => {
    localAudioTrack?.stop();
    const newTrack = await getLocalAudioTrack(newDeviceId);
    if (localAudioTrack) {
      const localTrackPublication = localParticipant?.unpublishTrack(
        localAudioTrack
      );
      localParticipant?.emit('trackUnpublished', localTrackPublication);
    }

    localParticipant?.publishTrack(newTrack);
  };

  return (
    <Style.Container>
      <div>
        {audioInputDevices.length > 1 ? (
          <FormControl fullWidth>
            <Heading variant="headingMedium">Audio Input:</Heading>
            <Select
              onChange={(e) => replaceTrack(e.target.value as string)}
              value={localAudioInputDeviceId || ''}
            >
              {audioInputDevices.map(({ deviceId, label }) => (
                <MenuItem value={deviceId} key={deviceId}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <>
            <Heading variant="headingMedium">Audio Input:</Heading>
            <Text>
              {localAudioTrack?.mediaStreamTrack.label || 'No Local Audio'}
            </Text>
          </>
        )}
      </div>
      <AudioLevelIndicator size={30} audioTrack={localAudioTrack} />
    </Style.Container>
  );
};

export default AudioInputList;
