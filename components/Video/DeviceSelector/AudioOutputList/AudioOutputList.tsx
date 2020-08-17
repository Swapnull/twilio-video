import React, { useContext } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { Heading, Text } from '@feast-it/pesto';
import { useAudioOutputDevices } from '~hooks/useDevices';
import { GlobalContext } from '~contexts/Global';

const AudioOutputList = () => {
  const audioOutputDevices = useAudioOutputDevices();
  const { activeSinkId, setActiveSinkId } = useContext(GlobalContext);
  const activeOutputLabel = audioOutputDevices.find(
    ({ deviceId }) => deviceId === activeSinkId
  )?.label;

  return (
    <div className="inputSelect">
      {audioOutputDevices.length > 1 ? (
        <FormControl fullWidth>
          <Heading variant="headingMedium">Audio Output:</Heading>
          <Select
            onChange={(e) => setActiveSinkId(e.target.value as string)}
            value={activeSinkId}
          >
            {audioOutputDevices.map((device) => (
              <MenuItem value={device.deviceId} key={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <>
          <Heading variant="headingMedium">Audio Output:</Heading>
          <Text>{activeOutputLabel || 'System Default Audio Output'}</Text>
        </>
      )}
    </div>
  );
};

export default AudioOutputList;
