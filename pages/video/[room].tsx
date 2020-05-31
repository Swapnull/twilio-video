import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useRoomState from '~hooks/useRoomState';
import Room from '~components/Room';
import LocalVideoPreview from '~components/LocalVideoPreview';
import Controls from '~components/Controls';
import { GlobalContext } from '~contexts/Global';
import { VideoContext } from '~contexts/Video';

const Container = styled.div<{ height?: number }>`
  display: grid;
  grid-template-rows: auto 1fr;
  height: ${({ height }) => height || '100vh'};
`;

const Main = styled.main<{ height?: number }>`
  overflow: hidden;
  height: ${({ height }) => height || '100vh'};
`;

const VideoRoomPage = ({ room }) => {
  const roomState = useRoomState();
  const { getToken } = useContext(GlobalContext);
  const { connect } = useContext(VideoContext);

  const [height, setHeight] = useState(null);

  useEffect(() => {
    const joinRoom = async () => {
      const token = await getToken(room as string);
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
    <Container height={height}>
      <Main height={height}>
        {roomState === 'disconnected' ? <LocalVideoPreview /> : <Room />}
        <Controls />
      </Main>
      {/*<ReconnectingNotification />*/}
    </Container>
  );
};

VideoRoomPage.getInitialProps = ({ query }) => ({ room: query.room });

export default VideoRoomPage;
