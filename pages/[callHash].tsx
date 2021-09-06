import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Video } from "../components/Video";
import { useRouter } from "next/dist/client/router";
import { Button, Col, Result, Row, Typography } from "antd";
import { useLocalMediaStream } from "../lib/useLocalMediaStream";
import { useFirestore } from "../lib/FirestoreProvider";

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

  const [currentUrl, setCurrentUrl] = useState("");
  const firestore = useFirestore();
  const callId = Array.isArray(callHash) ? callHash[0] : callHash;

  const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStream>();
  const remoteMediaStreamRef = useRef(remoteMediaStream);
  remoteMediaStreamRef.current = remoteMediaStream;

  const localMediaStream = useLocalMediaStream({
    skip: false,
  });

  const loadedCallRef = useRef(false);
  useEffect(() => {
    if (loadedCallRef.current || !callId || !localMediaStream) return;
    loadedCallRef.current = true;

    const load = async () => {
      const newRemoteMediaStream = new MediaStream();
      const pc = new RTCPeerConnection(rtcServers);

      // Push tracks from local stream to peer connection
      localMediaStream.getTracks().forEach((track) => {
        pc.addTrack(track, localMediaStream);
      });

      // Pull tracks from remote stream, add to video stream
      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          newRemoteMediaStream.addTrack(track);
        });
      };

      const callDoc = firestore.collection("calls").doc(callId);
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = callDoc.collection("answerCandidates");
      console.log(callId);
      const doc = await callDoc.get();
      console.log(doc.exists);

      if (!(await callDoc.get()).data()?.offer) {
        console.log("does not exist!");

        // Get candidates for caller, save to db
        pc.onicecandidate = (event) => {
          event.candidate && offerCandidates.add(event.candidate.toJSON());
        };

        // Create offer
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        const offer = {
          sdp: offerDescription.sdp,
          type: offerDescription.type,
        };

        await callDoc.set({ offer });

        // Listen for remote answer
        callDoc.onSnapshot((snapshot) => {
          const data = snapshot.data();
          if (!pc.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
          }
        });

        // When answered, add candidate to peer connection
        answerCandidates.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const candidate = new RTCIceCandidate(change.doc.data());
              pc.addIceCandidate(candidate);
              setRemoteMediaStream(newRemoteMediaStream);
            }
          });
        });

        setCurrentUrl(
          `${window?.location?.protocol}//${location.host}/${callId}`
        );

        return () => {
          pc.onicecandidate = null;
        };
      } else {
        console.log("exists!");

        pc.onicecandidate = (event) => {
          event.candidate && answerCandidates.add(event.candidate.toJSON());
        };

        const callData = (await callDoc.get()).data();
        console.log(callData);

        const offerDescription = callData?.offer;
        await pc.setRemoteDescription(
          new RTCSessionDescription(offerDescription)
        );

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        };

        await callDoc.update({ answer });

        offerCandidates.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              let data = change.doc.data();
              pc.addIceCandidate(new RTCIceCandidate(data));
              setRemoteMediaStream(newRemoteMediaStream);
            }
          });
        });
      }
    };

    load();
  }, [firestore, callId, localMediaStream]);

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
      {true && (
        <>
          {currentUrl && (
            <div css={{ marginBottom: 40 }}>
              <Typography.Title level={3}>
                Send this link to your friend for them to join:{" "}
                <Typography.Text code copyable>
                  {currentUrl}
                </Typography.Text>
              </Typography.Title>
            </div>
          )}
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
            {remoteMediaStream && (
              <Col span={12}>
                <Video
                  width="100%"
                  css={{ border: "2px solid black" }}
                  srcObject={remoteMediaStream}
                  autoPlay
                  playsInline
                />
              </Col>
            )}
          </Row>
        </>
      )}
    </div>
  );
};

export default Call;
