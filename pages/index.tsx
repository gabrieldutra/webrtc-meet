import type { NextPage } from "next";
import Head from "next/head";
import Typist from "react-typist";
import { VideoCameraOutlined } from "@ant-design/icons";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { JoinRoomModal } from "../components/JoinRoomModal";

const Home: NextPage = () => {
  const [isJoinRoomModalVisible, setIsJoinRoomModalVisible] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>WebRTC - Meet</title>
        <meta name="description" content="A basic meet application." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={styles.title}
        >
          <Typist>
            Welcome to{" "}
            <span css={{ marginLeft: 12 }}>
              <VideoCameraOutlined /> Meet
            </span>
          </Typist>
        </h1>

        <p className={styles.description}>
          Get started by joining an existing room or creating yours
        </p>

        <div className={styles.grid}>
          <a
            css={{ cursor: "pointer" }}
            onClick={() => setIsJoinRoomModalVisible(true)}
            className={styles.card}
          >
            <h2>Join &rarr;</h2>
            <p>Join an existing room with the provided id.</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Create &rarr;</h2>
            <p>Create a new room and invite your friends.</p>
          </a>
        </div>
      </main>
      <JoinRoomModal
        centered
        visible={isJoinRoomModalVisible}
        onOk={(roomId) => {
          console.log("Seleted Room: " + roomId);
          setIsJoinRoomModalVisible(false);
        }}
        onCancel={() => setIsJoinRoomModalVisible(false)}
      />
    </div>
  );
};

export default Home;
