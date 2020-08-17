import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import Style from './Video.style';
import Controls from '~components/Video/Controls';
import LocalVideoPreview from '~components/Video/LocalVideoPreview';
import Room from '~components/Video/Room';
import useRoomState from '~hooks/useRoomState';
import { GlobalContext } from '~contexts/Global';
import { VideoContext } from '~contexts/Video';

interface Props {
  room: string;
}

const Video = ({ room }: Props) => {
  const roomState = useRoomState();
  const { getToken } = useContext(GlobalContext);
  const { connect } = useContext(VideoContext);

  const [height, setHeight] = useState(null);

  useEffect(() => {
    const joinRoom = async () => {
      const token = await getToken(room);
      await connect(token);
    };
    joinRoom();
  }, [room]);

  useLayoutEffect(() => {
    const onResize = () => {
      setHeight(
        String(window?.innerHeight * (window.visualViewport?.scale || 1))
      );
    };

    window?.addEventListener('resize', onResize);
    return () => {
      window?.removeEventListener('resize', onResize);
    };
  });
  return (
    <Style.Container height={height}>
      <Style.Main height={height}>
        {roomState !== 'disconnected' ? <Room /> : <LocalVideoPreview />}
        <Controls />
      </Style.Main>
      {/*<ReconnectingNotification />*/}
    </Style.Container>
  );
};

export default Video;
