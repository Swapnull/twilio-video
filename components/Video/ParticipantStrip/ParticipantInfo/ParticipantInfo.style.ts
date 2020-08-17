import styled from '@emotion/styled';
import { maxWidth } from '@feast-it/pesto';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  ${({ theme }) => maxWidth(theme.breakpoints.m)} {
    font-size: 10px;
    width: 160px;
    height: 100%;
  }

  & video {
    filter: none;
  }

  & svg {
    stroke: black;
    stroke-width: 0.8px;
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95%;
  width: 95%;
  padding: 0.4rem;
  background: transparent;
`;
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Identity = styled.h4`
  background: rgba(0, 0, 0, 0.7);
  padding: 0.1rem 0.3rem;
  margin: 0;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1rem;
`;

export default { Container, InfoContainer, InfoRow, Identity };
