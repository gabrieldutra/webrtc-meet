import { ClassAttributes, useEffect, useRef, VideoHTMLAttributes } from "react";

type DefaultVideoProps = ClassAttributes<HTMLVideoElement> &
  VideoHTMLAttributes<HTMLVideoElement>;
export interface VideoProps extends DefaultVideoProps {
  srcObject?: MediaStream;
}
export function Video({ srcObject, ...otherProps }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && srcObject) videoRef.current.srcObject = srcObject;
  }, [srcObject]);

  return <video ref={videoRef} {...otherProps} />;
}
