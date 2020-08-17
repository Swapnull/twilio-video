import React, { useContext, useState } from 'react';
import { Button } from '@feast-it/pesto';
import Style from './Controls.style';
import {
  CallEnd,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  Fullscreen,
  FullscreenExit,
  Settings,
} from '@material-ui/icons';
import useLocalAudioToggle from '~hooks/useLocalAudioToggle';
import useLocalVideoToggle from '~hooks/useLocalVideoToggle';
import useFullScreen from '~hooks/useFullScreen';
import useIsUserActive from '~hooks/useIsUserActive';
import useRoomState from '~hooks/useRoomState';
import { VideoContext } from '~contexts/Video';
import { GlobalContext } from '~contexts/Global';
import DeviceSelector from '~components/Video/DeviceSelector';

const Controls = () => {
  const [deviceSelectorOpen, setDeviceSelectorOpen] = useState(true);
  const { room, connect } = useContext(VideoContext);
  const { token } = useContext(GlobalContext);

  const roomState = useRoomState();
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const [isFullScreen, toggleFullScreen] = useFullScreen();

  const isUserActive = useIsUserActive();

  const isReconnecting = roomState === 'reconnecting';
  const showControls = isUserActive || roomState === 'disconnected';

  return (
    <Style.Container showControls>
      <Button onClick={toggleAudioEnabled} disabled={isReconnecting}>
        {isAudioEnabled ? <Mic /> : <MicOff />}
      </Button>
      <Button onClick={toggleVideoEnabled} disabled={isReconnecting}>
        {isVideoEnabled ? <Videocam /> : <VideocamOff />}
      </Button>
      <Button onClick={toggleFullScreen}>
        {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
      </Button>
      <Button onClick={() => setDeviceSelectorOpen(true)}>
        <Settings />
      </Button>
      {deviceSelectorOpen && (
        <DeviceSelector onClose={() => setDeviceSelectorOpen(false)} />
      )}
      {roomState !== 'disconnected' && (
        <Button onClick={() => room.disconnect()} color={'red'}>
          <CallEnd />
        </Button>
      )}
    </Style.Container>
  );
};

export default Controls;
