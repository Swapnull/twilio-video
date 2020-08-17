import React, { useState, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { Heading, Text } from '@feast-it/pesto';

const Container = styled.div<{ height?: string }>`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const IndexPage = () => {
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
      <Heading>Video Chat</Heading>
      <Text>
        Welcome to Feast It Video Chat! Hit the button below to start a call,
        this will give you a link you can share with other parties.
      </Text>
    </Container>
  );
};

export default IndexPage;
