import { useEffect, useState } from "react";

const rtcServers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export function usePeerConnection(onTrack?: (e: RTCTrackEvent) => void) {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();

  useEffect(() => {
    setPeerConnection(new RTCPeerConnection(rtcServers));
  }, []);

  useEffect(() => {
    if (!peerConnection || !onTrack) return;

    peerConnection.ontrack = onTrack;

    return () => {
      peerConnection.ontrack = null;
    };
  }, [peerConnection, onTrack]);

  return peerConnection;
}
