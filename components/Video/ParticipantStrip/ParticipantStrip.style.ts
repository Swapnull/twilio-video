import styled from '@emotion/styled';
import { maxWidth } from '@feast-it/pesto';

const Container = styled.aside`
  padding: 0.5rem;
  overflow-y: auto;

  ${({ theme }) => maxWidth(theme.breakpoints.m)} {
    overflow-y: initial;
    overflow-x: auto;
    padding: 0;
    display: flex;
  }
`;

const ScrollContainer = styled.div`
  ${({ theme }) => maxWidth(theme.breakpoints.m)} {
    display: flex;
  }
`;

export default { Container, ScrollContainer };
