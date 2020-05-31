import { useEffect, useRef, useState } from 'react';
import { EventEmitter } from 'events';
import Video, { ConnectOptions, LocalTrack, Room } from 'twilio-video';
import { TwilioErrorCallback } from 'types/twilio';

const useRoom = (
  localTracks: LocalTrack[],
  onError: TwilioErrorCallback,
  options?: ConnectOptions
) => {
  const [room, setRoom] = useState<Room>(new EventEmitter() as Room);
  const [isConnecting, setIsConnecting] = useState(false);
  const localTracksRef = useRef<LocalTrack[]>([]);

  useEffect(() => {
    localTracksRef.current = localTracks;
  }, [localTracks]);

  const connect = async (token) => {
    setIsConnecting(true);
    try {
      const newRoom = await Video.connect(token, { ...options, tracks: [] });
      setRoom(newRoom);
      const disconnect = () => newRoom.disconnect();

      newRoom.once('disconnected', () => {
        setTimeout(() => setRoom(new EventEmitter() as Room));
        window?.removeEventListener('beforeunload', disconnect);
      });

      localTracksRef.current.forEach((track) =>
        newRoom.localParticipant.publishTrack(track, {
          priority: track.kind === 'video' ? 'low' : 'standard',
        })
      );

      setIsConnecting(false);
    } catch (error) {
      onError(error);
      setIsConnecting(false);
    }
  };

  return { room, isConnecting, connect };
};

export default useRoom;
