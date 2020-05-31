export default async () => {
  if (!navigator) return false;

  const devices = await navigator?.mediaDevices?.enumerateDevices();
  const shouldAskForPermissions =
    devices?.every((device) => !(device.deviceId && device.label)) || true;
  if (shouldAskForPermissions) {
    const mediaStream = await navigator?.mediaDevices?.getUserMedia({
      audio: true,
      video: true,
    });
    return mediaStream?.getTracks().forEach((track) => track.stop());
  }
};
