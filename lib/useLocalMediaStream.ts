import { useEffect, useState } from "react";

export function useLocalMediaStream() {
  const [localMediaStream, setLocalMediaStream] = useState<MediaStream>();

  useEffect(() => {
    let cancel = false;
    let localMedia: MediaStream;

    const loadLocalMedia = async () => {
      localMedia = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (!cancel) setLocalMediaStream(localMedia);
    };

    loadLocalMedia();
    return () => {
      if (localMedia) {
        localMedia.getTracks().forEach((track) => track.stop());
      }
      cancel = true;
    };
  }, []);

  return localMediaStream;
}
