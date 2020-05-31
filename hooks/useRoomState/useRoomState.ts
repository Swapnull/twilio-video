import { useEffect, useState, useContext } from 'react';
import { VideoContext } from '~contexts/Video';

type RoomStateType = 'disconnected' | 'connected' | 'reconnecting';

const useRoomState = () => {
  const { room } = useContext(VideoContext);
  const [state, setState] = useState<RoomStateType>('disconnected');

  const setRoomState = () =>
    setState((room.state || 'disconnected') as RoomStateType);

  useEffect(() => {
    setRoomState();
    room
      .on('disconnected', setRoomState)
      .on('reconnected', setRoomState)
      .on('reconnecting', setRoomState);

    return () => {
      room
        .off('disconnected', setRoomState)
        .off('reconnected', setRoomState)
        .off('reconnecting', setRoomState);
    };
  }, [room]);

  return state;
};

export default useRoomState;
