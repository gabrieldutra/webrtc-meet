import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Video } from "../components/Video";
import { useRouter } from "next/dist/client/router";
import { Col, Row, Typography } from "antd";

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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Head>
        <title>WebRTC - In a Call</title>
        <meta name="description" content="A basic meet application." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={{ marginBottom: 40 }}>
        <Typography.Title level={3}>
          Send this link to your friends for them to join:{" "}
          <Typography.Text code copyable>
            {`${location.protocol}//${location.host}${location.pathname}`}
          </Typography.Text>
        </Typography.Title>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Video
            width="100%"
            css={{ border: "2px solid black" }}
            srcObject={localMediaStream}
            autoPlay
            playsInline
          />
        </Col>
        <Col span={12}>
          <Video
            width="100%"
            css={{ border: "2px solid black" }}
            srcObject={localMediaStream}
            autoPlay
            playsInline
          />
        </Col>
      </Row>
    </div>
  );
};

export default Call;
