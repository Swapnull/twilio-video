import { useEffect, useRef, useContext } from 'react';
import { AudioTrack as IAudioTrack } from 'twilio-video';
import { GlobalContext } from '~contexts/Global';

interface AudioTrackProps {
  track: IAudioTrack;
}

const AudioTrack = ({ track }: AudioTrackProps) => {
  const { activeSinkId } = useContext(GlobalContext);
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    audioRef.current = track.attach();
    audioRef.current.setAttribute('data-cy-audio-track-name', track.name);
    document.body.appendChild(audioRef.current);
    console.log(audioRef.current);
    return () => track.detach().forEach((el) => el.remove());
  }, [track]);

  useEffect(() => {
    //@ts-ignore
    console.log('sinkId AudioTrack', activeSinkId);
    audioRef.current?.setSinkId?.(activeSinkId);
  }, [activeSinkId]);

  return null;
};

export default AudioTrack;
