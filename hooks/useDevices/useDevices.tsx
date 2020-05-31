import { useState, useEffect } from 'react';
import ensureMediaPermissions from '~utils/ensureMediaPermissions';

const useDevices = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const getDevices = async () => {
    await ensureMediaPermissions();
    const mediaDevices = await navigator?.mediaDevices?.enumerateDevices();
    setDevices(mediaDevices);
  };

  const filter = (filterBy: FilterBy) =>
    devices.filter(({ kind }) => kind === filterBy);

  useEffect(() => {
    navigator?.mediaDevices.addEventListener('devicechange', getDevices);
    getDevices();

    return () => {
      navigator?.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, []);

  return devices;
};

type FilterBy = 'audioinput' | 'audiooutput' | 'videoinput';

const filter = (filterBy: FilterBy) =>
  useDevices().filter(({ kind }) => kind === filterBy);

export const useAudioInputDevices = () => filter('audioinput');
export const useAudioOutputDevices = () => filter('audiooutput');
export const useVideoInputDevices = () => filter('videoinput');

export default useDevices;
