import { useEffect, useState } from "react";

export function useNewMediaStream() {
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  useEffect(() => {
    setMediaStream(new MediaStream());
  }, []);

  return mediaStream;
}
