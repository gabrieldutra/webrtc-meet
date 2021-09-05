import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Video } from "../components/Video";
import { useRouter } from "next/dist/client/router";

const Call: NextPage = () => {
  const {
    query: { callHash },
  } = useRouter();

  useEffect(() => {
    console.log(`Current Hash: ${callHash}`);
  });

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

  return (
    <div
      css={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Head>
        <title>WebRTC - In a Call</title>
        <meta name="description" content="A basic meet application." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Video
        css={{ border: "2px solid black" }}
        srcObject={localMediaStream}
        autoPlay
        playsInline
      />
    </div>
  );
};

export default Call;
