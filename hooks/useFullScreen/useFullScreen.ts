import { useCallback, useState, useEffect } from 'react';
import fscreen from 'fscreen';

const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<Boolean>(
    !!fscreen.fullscreenElement
  );

  useEffect(() => {
    const onFullScreenChange = () =>
      setIsFullScreen(!!fscreen.fullscreenElement);
    fscreen.addEventListener('fullscreenchange', onFullScreenChange);
    return () => {
      fscreen.removeEventListener('fullscreenchange', onFullScreenChange);
    };
  }, []);

  const toggleFullScreen = useCallback(() => {
    isFullScreen
      ? fscreen.exitFullscreen()
      : fscreen.requestFullscreen(document.documentElement);
  }, [isFullScreen]);

  return [isFullScreen, toggleFullScreen] as const;
};

export default useFullScreen;
