import { doc, Firestore, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { useFirestore } from "./FirestoreProvider";

export const CALL_QUERY_KEY = "getCall";

export function useFirestoreCallQuery(callId: string) {
  const db = useFirestore();
  return useQuery([CALL_QUERY_KEY, callId], () =>
    getDoc(doc(db, "calls", callId))
  );
}
