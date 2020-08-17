import React from 'react';
import styled from '@emotion/styled';
import { maxWidth } from '@feast-it/pesto';
import MainParticipant from '~components/Video/MainParticipant';
import ParticipantStrip from '~components/Video/ParticipantStrip';

const Container = styled.div`
    position: relative;
    height: 100%;
    display: grid;
    grid-template-columns 260px 1fr;
    grid-template-areas: "." "participantList";
    grid-template-rows: 100%;

    ${({ theme }) => maxWidth(theme.breakpoints.m)} {
        grid-template-areas: "participantList" ".";
        grid-template-columns: auto;
        grid-template-rows: calc(100% - 112px) 96px;
        grid-gap: 6px;
    }
`;

const Room = () => (
  <Container>
    <ParticipantStrip />
    <MainParticipant />
  </Container>
);

export default Room;
