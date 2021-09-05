import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useMemo } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAeAUOjqg1avvnmDk1iUfB_qRIs481Kj5I",
  authDomain: "webrtc-8144a.firebaseapp.com",
  projectId: "webrtc-8144a",
  storageBucket: "webrtc-8144a.appspot.com",
  messagingSenderId: "464658614828",
  appId: "1:464658614828:web:fcd8f1e2fe5fa312c05f89",
};

export function useFirestore() {
  return useMemo(() => {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }

    return getFirestore();
  }, []);
}
