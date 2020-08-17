import styled from '@emotion/styled';
import { maxWidth, rem } from '@feast-it/pesto';

const defaultGap = 16;

export const Column = styled.div<{ size: number }>`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: 0 0 auto;

  ${({ theme }) => maxWidth(theme.breakpoints.m)} {
    flex-basis: ${({ size }) => `${(100 * size) / 12}%`};
    width: ${({ size }) => `${(100 * size) / 12}%`};
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
`;

export const Grid = styled.div<{ gap?: string }>`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;

  ${Row} {
    margin-bottom: ${({ gap = defaultGap }) => rem(gap)};

    &:only-of-type {
      margin-bottom: 0;
    }
  }

  ${Column} {
    &:last-child {
      padding-right: 0;
    }
  }

  ${({ theme }) => maxWidth(theme.breakpoints.m)} {
    ${Column} {
      margin-bottom: 0;
      padding-right: ${({ gap = defaultGap }) => rem(gap)};
    }
  }

  ${({ theme }) => maxWidth(theme.breakpoints.l)} {
    ${Row} {
      flex-flow: row;
    }
  }
`;
