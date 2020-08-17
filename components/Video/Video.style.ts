import styled from '@emotion/styled';

const Container = styled.div<{ height?: number }>`
  display: grid;
  grid-template-rows: auto 1fr;
  height: ${({ height }) => height || '100vh'};
`;

const Main = styled.main<{ height?: number }>`
  overflow: hidden;
  height: ${({ height }) => height || '100vh'};
  position: relative;
`;

export default { Container, Main };
