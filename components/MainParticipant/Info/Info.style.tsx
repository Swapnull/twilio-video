import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  grid-area: participantList;
`;

const InfoContainer = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  padding: 0.4rem;
`;

const Identity = styled.h4`
  opacity: 0.7;
  padding: 0.1rem 0.3rem;
  margin: 1rem;
  font-size: 1.2rem;
  display: inline-flex;

  & svg {
    margin-left: 0.3rem;
  }
`;

export default { Container, InfoContainer, Identity };
