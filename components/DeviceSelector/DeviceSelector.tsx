import React from 'react';
import AudioInputList from './AudioInputList/AudioInputList';
import AudioOutputList from './AudioOutputList/AudioOutputList';
import { Dialog, DialogContent } from '@material-ui/core';
import { Button } from '@feast-it/pesto';
import Style from './DeviceSelector.style';
import VideoInputList from './VideoInputList/VideoInputList';

interface Props {
  onClose: () => void;
}

const DeviceSelector = ({ onClose }: Props) => (
  <Dialog open onClose={onClose}>
    <DialogContent>
      <Style.ListSection>
        <AudioInputList />
      </Style.ListSection>
      <Style.ListSection>
        <AudioOutputList />
      </Style.ListSection>
      <Style.ListSection>
        <VideoInputList />
      </Style.ListSection>
      <Button onClick={onClose}>Done</Button>
    </DialogContent>
  </Dialog>
);

export default DeviceSelector;
