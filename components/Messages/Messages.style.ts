import styled from '@emotion/styled';
import { maxWidth, rem } from '@feast-it/pesto';

const MessageCard = styled.div`
  position: relative;
  display: flex;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.blueLight};
  padding: ${rem(30)};
  transition: background-color ${({ theme }) => theme.transitions.short};
  width: 100%;

  &:first-child {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  &:last-child {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueLight};
  }

  ${({ theme }) => maxWidth(theme.breakpoints.m)} {
    flex-direction: column;
    overflow: hidden;
    flex: 1 1 100%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => maxWidth(theme.breakpoints.m)} {
    width: 30%;
    flex-shrink: 0;
  }
`;

const Meta = styled.div`
  font-size: ${rem(14)};
  color: $grey-light-dark;
  line-height: ${rem(24)};
  margin-bottom: ${rem(14)};

  ${({ theme }) => maxWidth(theme.breakpoints.m)} {
    font-size: ${rem(14)};
  }

  span {
    white-space: nowrap;
  }
`;

const Date = styled.span`
  margin: auto;
  position: absolute;
  top: ${rem(10)};
  right: ${rem(10)};
  color: ${({ theme }) => theme.colors.greyLightDark};
  font-size: ${rem(14)};

  ${({ theme }) => maxWidth(theme.breakpoints.m)} {
    position: static;
    white-space: nowrap;
  }
`;

export default { MessageCard, Info, Meta, Date };
