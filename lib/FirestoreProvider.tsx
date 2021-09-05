import React, { useContext } from "react";
import { Firestore, getFirestore } from "firebase/firestore";
import { getApps, initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAeAUOjqg1avvnmDk1iUfB_qRIs481Kj5I",
  authDomain: "webrtc-8144a.firebaseapp.com",
  projectId: "webrtc-8144a",
  storageBucket: "webrtc-8144a.appspot.com",
  messagingSenderId: "464658614828",
  appId: "1:464658614828:web:fcd8f1e2fe5fa312c05f89",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const firestore = getFirestore();

const FirestoreContext = React.createContext<Firestore>(firestore);

export function useFirestore() {
  return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <FirestoreContext.Provider value={firestore}>
      {children}
    </FirestoreContext.Provider>
  );
}
