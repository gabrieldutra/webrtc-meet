import { merge } from "lodash";
import { useEffect, useState } from "react";

export interface UseLocalMediaStreamOptions {
  skip: boolean;
}

const DEFAULT_OPTIONS = {
  skip: false,
};

export function useLocalMediaStream(
  options?: Partial<UseLocalMediaStreamOptions>
) {
  const { skip } = merge({}, DEFAULT_OPTIONS, options);

  const [localMediaStream, setLocalMediaStream] = useState<MediaStream>();

  useEffect(() => {
    let cancel = false;
    let localMedia: MediaStream;

    const loadLocalMedia = async () => {
      localMedia = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (!cancel) setLocalMediaStream(localMedia);
    };

    if (!skip) loadLocalMedia();

    return () => {
      if (localMedia) {
        localMedia.getTracks().forEach((track) => track.stop());
      }
      cancel = true;
    };
  }, [skip]);

  return localMediaStream;
}
