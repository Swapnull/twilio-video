import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from 'twilio-video';

declare module 'twilio-video' {
  interface LocalParticipant {
    setBandwidthProfile: (bandwidthProfile: BandwidthProfileOptions) => void;
    publishTrack(
      track: LocalTrack,
      options?: { priority: Track.Priority }
    ): Promise<LocalTrackPublication>;
  }

  interface VideoCodecSettings {
    simulcast?: boolean;
  }

  interface LocalVideoTrack {
    isSwitchedOff: undefined;
    setPriority: undefined;
  }

  interface RemoteVideoTrack {
    isSwitchedOff: boolean;
    setPriority: (priority: Track.Priority | null) => void;
  }

  interface VideoBandwidthProfileOptions {
    trackSwitchOffMode?: 'predicted' | 'detected' | 'disabled';
  }
}

declare global {
  interface Window {
    visualViewport?: {
      scale: number;
    };
    webkitAudioContext: typeof AudioContext;
  }

  interface MediaDevices {
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
  }

  interface HTMLMediaElement {
    setSinkId?(sinkId: string): Promise<undefined>;
  }
}

export type TwilioErrorCallback = (error: TwilioError) => void;
export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;
