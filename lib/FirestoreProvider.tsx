import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeAUOjqg1avvnmDk1iUfB_qRIs481Kj5I",
  authDomain: "webrtc-8144a.firebaseapp.com",
  projectId: "webrtc-8144a",
  storageBucket: "webrtc-8144a.appspot.com",
  messagingSenderId: "464658614828",
  appId: "1:464658614828:web:fcd8f1e2fe5fa312c05f89",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const FirestoreContext = React.createContext(firestore);

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
