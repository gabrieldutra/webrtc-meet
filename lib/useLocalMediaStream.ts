import { useEffect, useState } from "react";

export function useLocalMediaStream() {
  const [localMediaStream, setLocalMediaStream] = useState<MediaStream>();

  useEffect(() => {
    let cancel = false;

    const loadLocalMedia = async () => {
      const localMedia = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (!cancel) setLocalMediaStream(localMedia);
    };

    loadLocalMedia();
    return () => {
      cancel = true;
    };
  }, []);

  return localMediaStream;
}
