import React, { useState, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import useRoomState from '~hooks/useRoomState';
import Room from '~components/Room';
import LocalVideoPreview from '~components/LocalVideoPreview';
import Controls from '~components/Controls';

const Container = styled.div<{ height?: string }>`
  display: grid;
  grid-template-rows: auto 1fr;
  height: ${({ height }) => height || '100vh'};
`;

const Main = styled.main<{ height?: string }>`
  overflow: hidden;
  height: ${({ height }) => height || '100vh'};
`;

const IndexPage = () => {
  const roomState = useRoomState();
  const [height, setHeight] = useState(`100vh`);

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
    <Container height={`${height}px`}>
      <Main height={`${height}px`}>
        {roomState === 'disconnected' ? <LocalVideoPreview /> : <Room />}
        <Controls />
      </Main>
      {/*<ReconnectingNotification />*/}
    </Container>
  );
};

export default IndexPage;
