//TODO: Move this component to somewhere less nested as it is shared

import React, { useEffect, useRef, memo } from 'react';
import { AudioTrack, LocalAudioTrack, RemoteAudioTrack } from 'twilio-video';
import { interval } from 'd3-timer';
import MicOff from '@material-ui/icons/MicOff';
import useIsTrackEnabled from '~hooks/useIsTrackEnabled';

let clipId = 0;
const getUniqueClipId = () => clipId++;

// @ts-ignore
const AudioContext = process.browser
  ? window?.AudioContext || window?.webkitAudioContext!
  : null;
let audioContext: AudioContext;

export const initializeAnalyser = (stream: MediaStream) => {
  audioContext = audioContext || new AudioContext();
  const audioSource = audioContext.createMediaStreamSource(stream);

  const analyser = audioContext.createAnalyser();
  analyser.smoothingTimeConstant = 0.4;
  analyser.fftSize = 512;

  audioSource.connect(analyser);
  return analyser;
};

interface Props {
  size?: number;
  audioTrack?: AudioTrack;
  background?: string;
}

const AudioLevelIndicator = ({ size, audioTrack, background }: Props) => {
  const SIZE = size || 24;
  const ref = useRef<SVGRectElement>(null);
  const mediaStreamRef = useRef<MediaStream>();
  const isTrackEnabled = useIsTrackEnabled(
    audioTrack as LocalAudioTrack | RemoteAudioTrack
  );

  useEffect(() => {
    const handleStopped = () =>
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    audioTrack?.on('stopped', handleStopped);
    return () => {
      audioTrack?.off('stopped', handleStopped);
    };
  }, [audioTrack]);

  useEffect(() => {
    const SVGClipElement = ref.current;

    if (audioTrack && isTrackEnabled && SVGClipElement) {
      mediaStreamRef.current = new MediaStream([
        audioTrack.mediaStreamTrack.clone(),
      ]);

      let analyser = initializeAnalyser(mediaStreamRef.current);

      const reinitializeAnalyser = () => {
        analyser = initializeAnalyser(mediaStreamRef.current!);
      };

      window?.addEventListener('focus', reinitializeAnalyser);

      const sampleArray = new Uint8Array(analyser.frequencyBinCount);

      const timer = interval(() => {
        analyser.getByteFrequencyData(sampleArray);
        let values = 0;

        const length = sampleArray.length;
        for (let i = 0; i < length; i++) {
          values += sampleArray[i];
        }

        const volume = Math.min(
          21,
          Math.max(0, Math.log10(values / length / 3) * 14)
        );

        SVGClipElement?.setAttribute('y', String(21 - volume));
      }, 50);

      return () => {
        SVGClipElement.setAttribute('y', '21');
        timer.stop();
        window?.removeEventListener('focus', reinitializeAnalyser);
      };
    }
  }, [audioTrack, isTrackEnabled]);

  // Each instance of this component will need a unique HTML ID
  const clipPathId = `audio-level-clip-${getUniqueClipId()}`;

  return isTrackEnabled ? (
    <svg
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      height={`${SIZE}px`}
      width={`${SIZE}px`}
    >
      <defs>
        <clipPath id={clipPathId}>
          <rect ref={ref} x="0" y="21" width="24" height="24" />
        </clipPath>
      </defs>
      <path
        fill={background || 'rgba(255, 255, 255, 0.1)'}
        d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
      ></path>
      <path
        fill="#0c0"
        clipPath={`url(#${clipPathId})`}
        d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
      ></path>
    </svg>
  ) : (
    <MicOff
      height={`${SIZE}px`}
      width={`${SIZE}px`}
      style={{ width: 'initial', height: 'initial' }}
      data-cy-audio-mute-icon
    />
  );
};

export default memo(AudioLevelIndicator);
