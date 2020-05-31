import React, { createContext, ReactNode } from 'react';
import {
  Room,
  LocalAudioTrack,
  LocalVideoTrack,
  ConnectOptions,
  CreateLocalTrackOptions,
} from 'twilio-video';
import { TwilioErrorCallback } from 'types/twilio';
import { SelectedParticipantProvider } from '~contexts/SelectedParticipant';
import useLocalTracks from './useLocalTracks';
import useRoom from './useRoom';

export interface IVideoContext {
  room: Room;
  localTracks: (LocalAudioTrack | LocalVideoTrack)[];
  isConnecting: boolean;
  connect: (token: string) => Promise<void>;
  onError: TwilioErrorCallback;
  onDisconnect: () => void;
  getLocalVideoTrack: (
    options?: CreateLocalTrackOptions
  ) => Promise<LocalVideoTrack>;
  getLocalAudioTrack: (deviceId?: string) => Promise<LocalAudioTrack>;
}

export const VideoContext = createContext<IVideoContext>(null);

interface VideoProviderProps {
  options?: ConnectOptions;
  onError: TwilioErrorCallback;
  onDisconnect: () => void;
  children: ReactNode;
}

export const VideoProvider = ({
  options,
  children,
  onError,
  onDisconnect,
}: VideoProviderProps) => {
  const {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
  } = useLocalTracks();
  const { room, isConnecting, connect } = useRoom(
    localTracks,
    onError,
    options
  );
  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        onError,
        onDisconnect,
        connect,
        getLocalVideoTrack,
        getLocalAudioTrack,
      }}
    >
      <SelectedParticipantProvider room={room}>
        {children}
      </SelectedParticipantProvider>
    </VideoContext.Provider>
  );
};

export default VideoProvider;
