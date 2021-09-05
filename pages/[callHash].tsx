import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { Video } from "../components/Video";
import { useRouter } from "next/dist/client/router";
import { Button, Col, Result, Row, Typography } from "antd";
import { useLocalMediaStream } from "../lib/useLocalMediaStream";
import { useFirestoreCallQuery } from "../lib/useFirestoreCallQuery";

const rtcServers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

function CallEmptyState() {
  return (
    <Result
      status="404"
      title="Oops"
      subTitle="Sorry, we couldn't find this call."
      extra={
        <Button href="/" type="primary">
          Back Home
        </Button>
      }
    />
  );
}

const Call: NextPage = () => {
  const {
    query: { callHash },
  } = useRouter();

  const callId = Array.isArray(callHash) ? callHash[0] : callHash;

  // const peerConnection = useMemo(() => new RTCPeerConnection(rtcServers), []);

  const { data, isError, isLoading } = useFirestoreCallQuery(callId!);

  const localMediaStream = useLocalMediaStream({
    skip: isError || isLoading || !data?.exists(),
  });

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
      {!isLoading && !data?.exists() && <CallEmptyState />}
      {!isLoading && data?.exists() && (
        <>
          <div css={{ marginBottom: 40 }}>
            <Typography.Title level={3}>
              Send this link to your friends for them to join:{" "}
              <Typography.Text code copyable>
                {`${location?.protocol}//${location.host}/${callHash}`}
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
        </>
      )}
    </div>
  );
};

export default Call;
